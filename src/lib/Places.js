import { generatePlaceData } from "./aiGenerator";
import prisma from "./prisma";

//Get all place
const DEFAULT_PAGE_SIZE = 20
const MAX_PAGE_SIZE = 50

export async function getAllPlaces({
    page = 1,
    limit = DEFAULT_PAGE_SIZE,
    cursor = null,
} = {}) {
    try {
        const take = Math.min(parseInt(limit), MAX_PAGE_SIZE)
        const skip = cursor ? 1 : (parseInt(page) - 1) * take

        const whereClause = {};

        const [places, totalCount] = await Promise.all([
            prisma.place.findMany({
                where: whereClause,
                select: {
                    id: true,
                    slug: true,
                    name: true,
                    placeType: true,
                    overviewThumbnail: true,
                    aiContent: {
                        select: {
                            generatedDescription: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc' // or 'name': 'asc'
                },
                take,
                skip: cursor ? undefined : skip,
                ...(cursor && { cursor: { id: cursor } }),
            }),
            prisma.place.count({ where: whereClause })
        ])

        const totalPages = Math.ceil(totalCount / take);
        const hasNextPage = (page * take) < totalCount;
        const hasPrevPage = page > 1;

        const serializedPlaces = places.map(place => ({
            ...place,
            createdAt: place.createdAt?.toISOString(),
        }));

        const nextCursor = places.length > 0 ? places[places.length - 1].id : null;

        return {
            places: serializedPlaces,
            pagination: {
                totalCount,
                totalPages,
                currentPage: page,
                hasNextPage,
                hasPrevPage,
                nextCursor,
            },
        };

    } catch (error) {
        console.error('Prisma error fetching all place:', error);
        throw error;
    }
}


// get place by slug
const cache = new Map();
const CACHE_TTL = 1000 * 60 * 5;

export async function getPlaceBySlug(slug) {

    if (!slug || typeof slug !== 'string') {
        throw new Error('Invalid slug provided');
    }
    const cacheKey = `place:${slug}`;
    const cached = cache.get(cacheKey);

    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
        console.log('Cache hit for:', slug);
        return cached.data;
    }

    try {
        const place = await prisma.place.findUnique({
            where: { slug: slug },
            include: {
                aiContent: true
            }
        })
        if (!place) {
            return null
        }

        const transformedPlace = {
            ...place,
            createdAt: place.createdAt.toISOString(),
            updatedAt: place.updatedAt.toISOString(),
            aiOverview: {
                generatedDescription: place.aiContent?.generatedDescription,
                bestTimeToVisit: place.aiContent?.bestTimeToVisit,
                averageStayDuration: place.aiContent?.averageStayDuration,
                popularWith: place.aiContent?.popularWith || [],
            },
            aiCulture: {
                dos: place.aiContent?.cultureDos || [],
                donts: place.aiContent?.cultureDonts || [],
                customs: place.aiContent?.cultureCustoms || [],
                etiquette: {
                    dining: place.aiContent?.diningEtiquette,
                    public: place.aiContent?.publicEtiquette,
                    business: place.aiContent?.businessEtiquette,
                },
            },
            aiSafety: {
                overallRating: place.aiContent?.safetyRating,
                interpretedCrimeRate: place.aiContent?.interpretedCrimeRate,
                commonRisks: place.aiContent?.commonRisks || [],
                recommendations: place.aiContent?.safetyRecommendations || [],
            },
            transportation: {
                mainMethods: place.transportationMethods || [],
                tips: place.aiContent?.transportationTips || [],
            },
            aiContent: undefined,
        };

        cache.set(cacheKey, {
            data: transformedPlace,
            timestamp: Date.now()
        });
        return transformedPlace;

    } catch (error) {
        console.error('Prisma error fetching place by slug:', error);
        cache.delete(cacheKey);
        throw error;
    }
}



//get featured place
const featuredCache = {
    data: null,
    timestamp: 0
}
const featured_cache_TTL = 1000 * 30

export async function getFeaturedPlaces(limit = 6) {
    const cacheKey = `featured:${limit}`

    if (featuredCache.data && (Date.now() - featuredCache.timestamp < featured_cache_TTL)) {
        console.log('featured place cache hit')
        return featuredCache.data.slice(0, limit)
    }

    try {
        console.log('featured place cache miss')
        const featuredPlaces = await prisma.place.findMany({
            where: {
                // overviewThumbnail: { not: null },
            },
            select: {
                id: true,
                slug: true,
                name: true,
                overviewThumbnail: true,
                placeType: true,
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: Math.min(limit, 12)
        })

        featuredCache.data = featuredPlaces
        featuredCache.timestamp = Date.now()

        return featuredPlaces.slice(0, limit)

    } catch (error) {
        console.error('Error fetching featured places', error);
        return []

    }
}




//get search result
const maxSearchResult = 20
const searchCache_TTL = 1000 * 60 * 5
const searchCache = new Map()

const cleanupCache = () => {
    const now = Date.now()
    for (const [key, value] of searchCache.entries()) {
        if (now - value.timestamp > searchCache_TTL) {
            searchCache.delete(key)
        }
    }
}

export async function searchPlaces(query, limit = 10) {
    if (!query || typeof query !== 'string' || query.trim().length < 2) {
        return []
    }
    const normalizedQuery = query.trim().toLowerCase()
    const cacheKey = `search:${normalizedQuery}:${limit}`

    const cached = searchCache.get(cacheKey)
    if (cached && (Date.now() - cached.timestamp < searchCache_TTL)) {
        console.log('search cache hit')
        return cached.data
    }

    try {

        let results

        if (normalizedQuery.length <= 3) {
            results = await prisma.place.findMany({
                where: {
                    OR: [
                        { name: { contains: normalizedQuery, mode: 'insensitive' } },
                        { city: { contains: normalizedQuery, mode: 'insensitive' } },
                        { country: { contains: normalizedQuery, mode: 'insensitive' } },
                    ]
                },
                select: {
                    id: true,
                    slug: true,
                    name: true,
                    city: true,
                    country: true,
                    overviewThumbnail: true,
                },
                take: Math.min(limit, maxSearchResult),
                orderBy: {
                    name: 'asc'
                }
            })
        }
        else {
            results = await prisma.$queryRaw`
        SELECT 
          id, slug, name, city, country, 
          overview_thumbnail as "overviewThumbnail",
          ts_rank(to_tsvector('english', name || ' ' || city || ' ' || country || ' '), 
          plainto_tsquery('english', ${normalizedQuery})) as rank
        FROM places
        WHERE to_tsvector('english', name || ' ' || city || ' ' || country || ' ') 
          @@ plainto_tsquery('english', ${normalizedQuery})
        ORDER BY rank DESC
        LIMIT ${Math.min(limit, maxSearchResult)}
      `;
        }

        if (Math.random() < 0.1) { // 10% chance to clean cache
            cleanupCache()
            console.log('search cache cleaned')
        }

        searchCache.set(cacheKey, {
            data: results,
            timestamp: Date.now()
        })
        // console.log('search result:', results)
        return results

    } catch (error) {
        console.error('Error searching', error);
        return []
    }
}


//Search or generate place data
export async function searchOrGeneratePlace(query, limit = 8) {
    try {
        // 1. First, try to search existing places
        const existingResults = await searchPlaces(query, limit);

        if (existingResults.length > 0) {
            return {
                results: existingResults,
                generated: false,
                source: 'database'
            };
        }

        // 2. If no results, validate if it's a real place
        const isValidPlace = await isValidPlaceName(query);

        if (!isValidPlace) {
            return {
                results: [],
                generated: false,
                source: 'invalid_query',
                message: 'Please enter a valid place name'
            };
        }

        // 3. Generate new place data
        console.log(`Generating new place data for: ${query}`);
        const generatedData = await generatePlaceData(query);

        // 4. Save to database
        const savedPlace = await saveGeneratedPlace(generatedData);

        // 5. Return the generated result
        const result = {
            id: savedPlace.id,
            slug: savedPlace.slug,
            name: savedPlace.name,
            city: savedPlace.city,
            country: savedPlace.country,
            overviewThumbnail: savedPlace.overviewThumbnail,
            shortDescription: savedPlace.shortDescription,
            aiGenerated: true,
            isNew: true
        };

        return {
            results: [result],
            generated: true,
            source: 'ai_generated'
        };

    } catch (error) {
        console.error('Search or generate error:', error);

        // Return empty results on error, but don't break the UI
        return {
            results: [],
            generated: false,
            source: 'error',
            message: 'Unable to search at the moment. Please try again.'
        };
    }
}

async function saveGeneratedPlace(placeData) {
    try {
        const newPlace = await prisma.place.create({
            data: {
                name: placeData.name,
                slug: placeData.slug || generateSlug(placeData.name),
                description: placeData.description,
                placeType: placeData.placeType,
                country: placeData.country,
                state: placeData.state,
                city: placeData.city,
                latitude: placeData.coordinates?.latitude,
                longitude: placeData.coordinates?.longitude,
                population: placeData.population,
                timezone: placeData.timezone,
                languages: placeData.languages,
                currency: placeData.currency,
                overviewImage: placeData.overviewImage,
                overviewThumbnail: placeData.overviewThumbnail,
                shortDescription: placeData.description?.substring(0, 150) + '...',
                attractions: placeData.attractions,
                transportationMethods: placeData.transportation?.mainMethods,
                emergencyNumber: placeData.emergencyNumber,
                aiGenerated: true,
                generationStatus: 'completed',
                lastVerified: new Date(),
                aiContent: {
                    create: {
                        generatedDescription: placeData.description,
                        bestTimeToVisit: placeData.overview?.bestTimeToVisit,
                        averageStayDuration: placeData.overview?.averageStayDuration,
                        popularWith: placeData.overview?.popularWith,
                        cultureDos: placeData.culture?.dos,
                        cultureDonts: placeData.culture?.donts,
                        cultureCustoms: placeData.culture?.customs,
                        diningEtiquette: placeData.culture?.etiquette?.dining,
                        publicEtiquette: placeData.culture?.etiquette?.public,
                        businessEtiquette: placeData.culture?.etiquette?.business,
                        safetyRating: placeData.safety?.overallRating,
                        interpretedCrimeRate: placeData.safety?.overallRating,
                        commonRisks: placeData.safety?.commonRisks,
                        safetyRecommendations: placeData.safety?.recommendations,
                        transportationTips: placeData.transportation?.tips,
                        lastGenerated: new Date(),
                    }
                }
            },
            include: {
                aiContent: true
            }
        });

        return newPlace;
    } catch (error) {
        console.error('Error saving generated place:', error);
        throw new Error('Failed to save generated place data');
    }
}
function generateSlug(name) {
    return name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}



//validate place name
export async function isValidPlaceName(placeName) {
    if (!placeName || typeof placeName !== 'string') {
        return false
    }

    const normalizedName = placeName.trim();

    if (normalizedName.length < 2 || !/[a-zA-Z]/.test(normalizedName)) {
        return false;
    }

    try {
        const hasValidCoordinates = await validateWithGeocoding(normalizedName);
        return hasValidCoordinates;
    } catch (error) {
        console.log('Not a valid place name', error)
        return normalizedName.length >= 2;
    }
}

async function validateWithGeocoding(placeName) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}&limit=1`)
        if (!response.ok) {
            return true
        }
        const data = await response.json()
        return data && data.length > 0

    } catch (error) {
        console.error('Geocoding validation error:', error);
        return true;
    }
}









// insert place
export async function insertPlace() {
    try {
        const newPlace = await prisma.place.create({
            data: {
                slug: 'brooklyn-new-york-usa',
                name: 'Brooklyn, New York',
                placeType: 'borough',
                country: 'United States',
                state: 'New York',
                city: 'New York City',
                latitude: 40.6782,
                longitude: -73.9442,
                population: 2736074,
                timezone: 'America/New_York',
                languages: ['en', 'es', 'zh', 'ru'],
                currency: 'USD',
                overviewImage: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800&h=600&fit=crop',
                overviewThumbnail: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=400&h=300&fit=crop',
                attractions: [
                    'Brooklyn Bridge',
                    'Prospect Park',
                    'Brooklyn Museum',
                    'Coney Island',
                    'DUMBO neighborhood',
                    'Williamsburg'
                ].join(', '),
                transportationMethods: ['NYC Subway', 'Buses', 'Uber/Lyft', 'Citi Bike', 'Walking'].join(', '),
                emergencyNumber: '911',
            }
        })
        return newPlace
    } catch (error) {
        console.error('Prisma error posting place:', error);
    }
}
