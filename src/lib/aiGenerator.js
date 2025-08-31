export async function generatePlaceData(placeName) {
    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-r1-0528:free",
                messages: [
                    {
                        role: "system",
                        content: "You are a knowledgeable travel expert and cultural guide. Provide accurate, helpful information. Return ONLY valid JSON in this exact given structure"
                    },
                    {
                        role: "user",
                        content: `You are a expert cultural travel guide. Generate comprehensive data for the place: "${placeName}".

                        Return ONLY valid JSON in this exact structure:
                        {
                        "name": "Full official name",
                        "slug": "url-friendly-slug",
                        "description": "2-3 sentence engaging description",
                        "placeType": "district|city|neighborhood|landmark",
                        "country": "Country name",
                        "state": "State/region if applicable",
                        "city": "City name",
                        "coordinates": {
                            "latitude": number,
                            "longitude": number
                        },
                        "population": number,
                        "timezone": "Continent/City",
                        "languages": ["primary", "secondary"],
                        "currency": "Currency code",
                        "overview": {
                            "bestTimeToVisit": "Season or months",
                            "averageStayDuration": "e.g., 2-3 days",
                            "popularWith": ["type of travelers"]
                        },
                        "culture": {
                            "dos": ["5-7 specific important cultural do's"],
                            "donts": ["5-7 specific important cultural don'ts"],
                            "customs": ["3-5 unique local customs"],
                            "etiquette": {
                            "dining": "Specific dining etiquette",
                            "public": "Public behavior norms",
                            "business": "Business etiquette if applicable"
                            }
                        },
                        "safety": {
                            "overallRating": 8.5,
                            "commonRisks": ["specific risks"],
                            "recommendations": ["practical safety tips"]
                        },
                        "transportation": {
                            "mainMethods": ["primary transport options"],
                            "tips": ["practical transportation tips"]
                        },
                        "attractions": ["5-8 main attractions"]
                        }

                        Ensure data is accurate, culturally sensitive, and practical for visitors/travelers.`
                    }
                ],
                max_tokens: 3000,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            throw new Error(`AI API error: ${response.statusText}`);
        }

        const data = await response.json();
        const content = data.choices[0]?.message?.content;
        const cleanContent = content.replace(/^```json\s*|\s*```$/g, '').trim();

        console.log('AI res:', content)

        if (!content) {
            throw new Error('No content generated');
        }

        // Parse and return structured data
        return parseAIResponse(cleanContent, placeName);

    } catch (error) {
        console.error('AI generation error:', error);
        // Fallback to basic data structure
        return createFallbackData(placeName);
    }
}

async function parseAIResponse(content, placeName) {

    function generateSlug(name) {
        return name.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }

    try {
        const parsed = JSON.parse(content);
        return {
            name: parsed.name || placeName,
            slug: parsed.slug || generateSlug(placeName),
            description: parsed.description || `Travel information about ${placeName}`,
            placeType: parsed.placeType || 'landmark',
            country: parsed.country || 'Unknown',
            state: parsed.state || null,
            city: parsed.city || 'Unknown',
            coordinates: parsed.coordinates || { latitude: 0, longitude: 0 },
            population: parsed.population || 0,
            timezone: parsed.timezone || 'UTC',
            languages: parsed.languages || ['English'],
            currency: parsed.currency || 'USD',
            overview: {
                bestTimeToVisit: parsed.overview?.bestTimeToVisit || 'Year-round',
                averageStayDuration: parsed.overview?.averageStayDuration || '1-2 days',
                popularWith: parsed.overview?.popularWith || ['tourists']
            },
            culture: {
                dos: parsed.culture?.dos || ['Be respectful of local customs'],
                donts: parsed.culture?.donts || ['Avoid inappropriate behavior'],
                customs: parsed.culture?.customs || ['Local traditions'],
                etiquette: {
                    dining: parsed.culture?.etiquette?.dining || 'Standard dining etiquette',
                    public: parsed.culture?.etiquette?.public || 'Respectful public behavior',
                    business: parsed.culture?.etiquette?.business || 'Professional conduct'
                }
            },
            safety: {
                overallRating: parsed.safety?.overallRating || 7.0,
                commonRisks: parsed.safety?.commonRisks || ['General travel risks'],
                recommendations: parsed.safety?.recommendations || ['Stay aware of surroundings']
            },
            transportation: {
                mainMethods: parsed.transportation?.mainMethods || ['Public transport'],
                tips: parsed.transportation?.tips || ['Use official transportation services']
            },
            attractions: parsed.attractions || [`Explore ${placeName}`],
            overviewThumbnail: await getPlaceImage(parsed.name, parsed.country)
        };
    } catch (error) {
        console.log('Error in parsing ai content: ', error)
        return [];
    }
}

// get unsplash image
async function getPlaceImage(name, country) {
    try {
        const query = encodeURIComponent(`${name} ${country} tourist`);
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
        const data = await response.json();
        console.log('unsplash link:', data.results?.[0]?.urls?.regular)
        return data.results?.[0]?.urls?.regular
    } catch (error) {
        console.error('Image fetch error:', error);
    }
    return null;
}


function createFallbackData(placeName) {
    return {
        name: placeName,
        city: 'Unknown',
        country: 'Unknown',
        description: `Cultural and travel information about ${placeName}.`,
        overviewThumbnail: null,
        aiGenerated: true,
        isFallback: true
    };
}