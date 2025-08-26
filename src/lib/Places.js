import prisma from "./prisma";

export async function getPlaceBySlug(slug) {

    try {
        const place = await prisma.place.findUnique({
            where: { slug: slug },
            include: { aiContent: true }
        })
        if (!place) {
            return null
        }
        return place

    } catch (error) {
        console.error('Prisma error fetching place:', error);
        return null;
    }
}

export async function insertPlace() {
    try {
        const newPlace = await prisma.place.create({
            data: {
                slug: 'shinjuku-tokyo-japan',
                name: 'Shinjuku, Tokyo',
                placeType: 'district',
                country: 'Japan',
                state: 'Tokyo',
                city: 'Tokyo',
                latitude: 35.6938,
                longitude: 139.7036,
                population: 346235,
                timezone: 'Asia/Tokyo',
                languages: ['ja', 'en'],
                currency: 'JPY',
                overviewImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop',
                overviewThumbnail: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop',
                attractions: [
                    'Tokyo Metropolitan Government Building',
                    'Kabukicho entertainment district',
                    'Takashimaya Department Store',
                    'Golden Gai bars',
                    'Shinjuku Gyoen National Garden',
                ],
                transportationMethods: ['JR Yamanote Line', 'Tokyo Metro', 'Walking', 'Taxi'],
                emergencyNumber: '110 (Police), 119 (Fire/Medical)',
            }
        })
        return newPlace
    } catch (error) {
        console.error('Prisma error posting place:', error);
    }
}

export const places = [
    {
        id: "1",
        slug: "shinjuku-tokyo-japan",
        name: "Shinjuku, Tokyo",
        description: "The bustling heart of Tokyo with neon lights, skyscrapers, and vibrant nightlife. A district that never sleeps.",
        placeType: "district",
        country: "Japan",
        state: "Tokyo",
        city: "Tokyo",
        coordinates: {
            latitude: 35.6938,
            longitude: 139.7036
        },
        population: 346235,
        timezone: "Asia/Tokyo",
        languages: ["ja", "en"],
        currency: "JPY",
        overview: {
            image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
            thumbnail: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
            bestTimeToVisit: "March-May, October-November",
            averageStayDuration: "2-3 days",
            popularWith: ["Business travelers", "Nightlife enthusiasts", "Shopping lovers"]
        },
        culture: {
            dos: [
                "Queue politely and wait your turn",
                "Use both hands when paying or receiving business cards",
                "Bow slightly when greeting someone",
                "Remove shoes when entering certain establishments",
                "Speak quietly in public transportation"
            ],
            donts: [
                "Don't talk loudly on phones in trains",
                "Don't tip in restaurants or services",
                "Don't eat or drink while walking",
                "Don't point at people with your finger",
                "Don't blow your nose in public"
            ],
            customs: [
                "Business cards (meishi) are exchanged with both hands and a bow",
                "Gift-giving is common and gifts should be wrapped",
                "Punctuality is extremely important"
            ],
            etiquette: {
                dining: "Wait to be seated, don't stick chopsticks upright in rice",
                public: "Keep voices low, avoid public displays of affection",
                business: "Dress conservatively, arrive early for meetings"
            }
        },
        safety: {
            overallRating: 9.5,
            crimeRate: "Very Low",
            commonRisks: ["Natural disasters (earthquakes)", "Getting lost in complex train system"],
            emergencyNumber: "110 (Police), 119 (Fire/Medical)",
            safeTimes: "24/7 - one of the safest places in the world",
            recommendations: [
                "Keep emergency contact information in Japanese",
                "Download offline maps for the complex train system",
                "Carry cash as many places don't accept cards"
            ]
        },
        transportation: {
            mainMethods: ["JR Yamanote Line", "Tokyo Metro", "Walking", "Taxi"],
            tips: [
                "Get a JR Pass for multiple train rides",
                "Avoid rush hours (7-9 AM, 5-7 PM)",
                "Download Google Translate with camera feature"
            ]
        },
        attractions: [
            "Tokyo Metropolitan Government Building",
            "Kabukicho entertainment district",
            "Takashimaya Department Store",
            "Golden Gai bars",
            "Shinjuku Gyoen National Garden"
        ]
    },

    {
        id: "2",
        slug: "mumbai-maharashtra-india",
        name: "Mumbai, Maharashtra",
        description: "The commercial capital of India, known for Bollywood, street food, and the spirit of entrepreneurship.",
        placeType: "city",
        country: "India",
        state: "Maharashtra",
        city: "Mumbai",
        coordinates: {
            latitude: 19.0760,
            longitude: 72.8777
        },
        population: 12442373,
        timezone: "Asia/Kolkata",
        languages: ["hi", "mr", "en", "gu"],
        currency: "INR",
        overview: {
            image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop",
            thumbnail: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h=300&fit=crop",
            bestTimeToVisit: "November-February",
            averageStayDuration: "3-5 days",
            popularWith: ["Business travelers", "Food enthusiasts", "Culture seekers"]
        },
        culture: {
            dos: [
                "Dress modestly when visiting religious places",
                "Remove shoes before entering temples and homes",
                "Use right hand for eating and greeting",
                "Negotiate prices at street markets",
                "Try the local street food"
            ],
            donts: [
                "Don't use left hand for eating or greeting",
                "Don't wear revealing clothes at religious sites",
                "Don't drink tap water",
                "Don't touch someone's head",
                "Don't refuse food or tea when offered"
            ],
            customs: [
                "Namaste greeting with palms together",
                "Respect for elders is paramount",
                "Festivals are celebrated with great enthusiasm"
            ],
            etiquette: {
                dining: "Eat with right hand, sharing food shows friendship",
                public: "Dress conservatively, especially for women",
                business: "Building relationships is crucial before business"
            }
        },
        safety: {
            overallRating: 6.5,
            crimeRate: "Medium",
            commonRisks: ["Pickpocketing", "Traffic accidents", "Monsoon flooding"],
            emergencyNumber: "100 (Police), 101 (Fire), 108 (Medical)",
            safeTimes: "Generally safe during day, be cautious at night",
            recommendations: [
                "Use prepaid taxis or ride-sharing apps",
                "Keep valuables in hotel safe",
                "Avoid street food if you have sensitive stomach",
                "Stay hydrated and use bottled water"
            ]
        },
        transportation: {
            mainMethods: ["Local trains", "Mumbai Metro", "Taxis", "Auto-rickshaws", "Buses"],
            tips: [
                "Local trains are fastest but very crowded",
                "Use Ola/Uber for safer taxi rides",
                "Avoid peak hours if possible (7-10 AM, 6-9 PM)"
            ]
        },
        attractions: [
            "Gateway of India",
            "Marine Drive",
            "Bollywood Film City",
            "Elephanta Caves",
            "Crawford Market",
            "Juhu Beach"
        ]
    },

    {
        id: "3",
        slug: "brooklyn-new-york-usa",
        name: "Brooklyn, New York",
        description: "Discover the diverse neighborhoods and artistic culture of New York City's most populous borough.",
        placeType: "borough",
        country: "United States",
        state: "New York",
        city: "New York City",
        coordinates: {
            latitude: 40.6782,
            longitude: -73.9442
        },
        population: 2736074,
        timezone: "America/New_York",
        languages: ["en", "es", "zh", "ru"],
        currency: "USD",
        overview: {
            image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800&h=600&fit=crop",
            thumbnail: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=400&h=300&fit=crop",
            bestTimeToVisit: "April-June, September-November",
            averageStayDuration: "2-4 days",
            popularWith: ["Art lovers", "Food enthusiasts", "Families", "Young professionals"]
        },
        culture: {
            dos: [
                "Tip 18-20% at restaurants",
                "Stand right on escalators, walk left",
                "Make eye contact when greeting",
                "Explore different neighborhoods for unique experiences",
                "Try the local pizza and bagels"
            ],
            donts: [
                "Don't block sidewalks or subway doors",
                "Don't be overly loud in residential areas",
                "Don't expect everything to be cheap",
                "Don't ignore street rules and signals",
                "Don't flash expensive items openly"
            ],
            customs: [
                "Small talk with strangers is common",
                "Diversity is celebrated and embraced",
                "Street art and murals are part of the culture"
            ],
            etiquette: {
                dining: "Tipping is expected, splitting bills is normal",
                public: "Personal space is respected, walk with purpose",
                business: "Punctuality and directness are valued"
            }
        },
        safety: {
            overallRating: 7.5,
            crimeRate: "Medium-Low",
            commonRisks: ["Petty theft", "Traffic accidents", "Occasional street crime"],
            emergencyNumber: "911",
            safeTimes: "Generally safe during day, some areas to avoid at night",
            recommendations: [
                "Stay aware of surroundings, especially at night",
                "Use well-lit streets and main thoroughfares",
                "Keep valuables secure and out of sight",
                "Know your neighborhood - some areas are safer than others"
            ]
        },
        transportation: {
            mainMethods: ["NYC Subway", "Buses", "Uber/Lyft", "Citi Bike", "Walking"],
            tips: [
                "MetroCard or OMNY for public transport",
                "Subway is fastest for longer distances",
                "Biking is great for short distances"
            ]
        },
        attractions: [
            "Brooklyn Bridge",
            "Prospect Park",
            "Brooklyn Museum",
            "Coney Island",
            "DUMBO neighborhood",
            "Williamsburg"
        ]
    },

    {
        id: "4",
        slug: "paris-ile-de-france-france",
        name: "Paris, Île-de-France",
        description: "The City of Light, renowned for its art, fashion, gastronomy, and culture. A timeless destination of romance and elegance.",
        placeType: "city",
        country: "France",
        state: "Île-de-France",
        city: "Paris",
        coordinates: {
            latitude: 48.8566,
            longitude: 2.3522
        },
        population: 2161000,
        timezone: "Europe/Paris",
        languages: ["fr", "en"],
        currency: "EUR",
        overview: {
            image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop",
            thumbnail: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop",
            bestTimeToVisit: "April-June, September-October",
            averageStayDuration: "3-5 days",
            popularWith: ["Art lovers", "Couples", "Culture enthusiasts", "Food connoisseurs"]
        },
        culture: {
            dos: [
                "Greet shopkeepers with 'Bonjour' when entering",
                "Dress elegantly, especially for dinner",
                "Learn basic French phrases",
                "Take time to enjoy meals - don't rush",
                "Visit museums and galleries"
            ],
            donts: [
                "Don't speak loudly in restaurants",
                "Don't wear athletic wear outside of gyms",
                "Don't expect shops to be open on Sundays",
                "Don't eat lunch before 12 PM or dinner before 7 PM",
                "Don't assume everyone speaks English"
            ],
            customs: [
                "Air kisses (la bise) for greetings among friends",
                "Long lunch breaks are sacred",
                "Fashion and style are highly valued"
            ],
            etiquette: {
                dining: "Keep hands visible on table, finish everything on plate",
                public: "Dress well, maintain quiet demeanor",
                business: "Formal address until invited to use first names"
            }
        },
        safety: {
            overallRating: 7.8,
            crimeRate: "Low-Medium",
            commonRisks: ["Pickpocketing in tourist areas", "Metro scams", "Protest disruptions"],
            emergencyNumber: "112 (General), 15 (Medical), 17 (Police), 18 (Fire)",
            safeTimes: "Very safe during day, exercise caution at night in some areas",
            recommendations: [
                "Watch for pickpockets near major attractions",
                "Avoid displaying expensive items openly",
                "Stay in well-lit areas at night",
                "Keep copies of important documents"
            ]
        },
        transportation: {
            mainMethods: ["Metro", "Buses", "RER trains", "Taxis", "Walking", "Vélib' bikes"],
            tips: [
                "Buy weekly Metro pass for savings",
                "Metro closes around 1 AM (2 AM on weekends)",
                "Walking is great for short distances"
            ]
        },
        attractions: [
            "Eiffel Tower",
            "Louvre Museum",
            "Notre-Dame Cathedral",
            "Arc de Triomphe",
            "Montmartre and Sacré-Cœur",
            "Seine River Cruise"
        ]
    },

    {
        id: "5",
        slug: "london-england-uk",
        name: "London, England",
        description: "A vibrant metropolis blending royal heritage with modern innovation. From historic landmarks to cutting-edge culture.",
        placeType: "city",
        country: "United Kingdom",
        state: "England",
        city: "London",
        coordinates: {
            latitude: 51.5074,
            longitude: -0.1278
        },
        population: 9648110,
        timezone: "Europe/London",
        languages: ["en"],
        currency: "GBP",
        overview: {
            image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&h=600&fit=crop",
            thumbnail: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=300&fit=crop",
            bestTimeToVisit: "May-September",
            averageStayDuration: "3-5 days",
            popularWith: ["History buffs", "Theater lovers", "Royal family enthusiasts", "Pub culture fans"]
        },
        culture: {
            dos: [
                "Queue politely and respect the line",
                "Stand right on escalators",
                "Say please, thank you, and sorry frequently",
                "Try traditional pub food",
                "Respect royal traditions and ceremonies"
            ],
            donts: [
                "Don't cut in queues",
                "Don't be overly loud on public transport",
                "Don't expect shops to stay open late",
                "Don't tip excessively (10-12% is standard)",
                "Don't mock the accent or royal family"
            ],
            customs: [
                "Pub culture is central to social life",
                "Afternoon tea is a cherished tradition",
                "Weather is a common conversation starter"
            ],
            etiquette: {
                dining: "Hold knife in right hand, fork in left",
                public: "Mind the gap, apologize for minor inconveniences",
                business: "Punctuality is crucial, understatement is valued"
            }
        },
        safety: {
            overallRating: 8.2,
            crimeRate: "Low",
            commonRisks: ["Pickpocketing in tourist areas", "Bicycle theft", "Occasional terrorism alerts"],
            emergencyNumber: "999",
            safeTimes: "Very safe during day, generally safe at night in central areas",
            recommendations: [
                "Be aware of your surroundings in crowded areas",
                "Don't leave belongings unattended",
                "Follow official advice during security alerts",
                "Use licensed black cabs or registered minicabs"
            ]
        },
        transportation: {
            mainMethods: ["Underground (Tube)", "Buses", "Black cabs", "Walking", "Boris Bikes"],
            tips: [
                "Get an Oyster Card or use contactless payment",
                "Avoid peak hours (7-9 AM, 5-7 PM)",
                "Many attractions are within walking distance"
            ]
        },
        attractions: [
            "Big Ben and Westminster",
            "Tower Bridge",
            "British Museum",
            "Buckingham Palace",
            "London Eye",
            "Tower of London"
        ]
    },

    {
        id: "6",
        slug: "bali-indonesia",
        name: "Bali, Indonesia",
        description: "The Island of Gods, offering spiritual retreats, stunning beaches, vibrant culture, and world-class hospitality.",
        placeType: "province",
        country: "Indonesia",
        state: "Bali",
        city: "Denpasar",
        coordinates: {
            latitude: -8.4095,
            longitude: 115.1889
        },
        population: 4317404,
        timezone: "Asia/Makassar",
        languages: ["id", "ban", "en"],
        currency: "IDR",
        overview: {
            image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop",
            thumbnail: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
            bestTimeToVisit: "April-October (dry season)",
            averageStayDuration: "5-10 days",
            popularWith: ["Beach lovers", "Digital nomads", "Yoga enthusiasts", "Honeymooners"]
        },
        culture: {
            dos: [
                "Dress modestly when visiting temples",
                "Remove shoes before entering sacred areas",
                "Use right hand for giving and receiving",
                "Participate in local ceremonies if invited",
                "Support local artisans and businesses"
            ],
            donts: [
                "Don't point feet toward sacred objects or people",
                "Don't touch anyone's head",
                "Don't use left hand for important activities",
                "Don't wear revealing clothing at temples",
                "Don't step on ceremonial offerings (canang sari)"
            ],
            customs: [
                "Hindu-Balinese ceremonies are frequent and colorful",
                "Offerings to gods are made daily",
                "Community (gotong royong) is highly valued"
            ],
            etiquette: {
                dining: "Wait to be served, eat with right hand or utensils",
                public: "Modest dress, especially at religious sites",
                business: "Relationship building is important before business"
            }
        },
        safety: {
            overallRating: 8.0,
            crimeRate: "Low",
            commonRisks: ["Motorbike accidents", "Petty theft", "Natural disasters (volcanoes, earthquakes)"],
            emergencyNumber: "112",
            safeTimes: "Generally very safe, be cautious on motorbikes",
            recommendations: [
                "Wear helmet when riding motorbikes",
                "Don't leave valuables unattended on beaches",
                "Check weather conditions during rainy season",
                "Drink bottled water and eat at clean establishments"
            ]
        },
        transportation: {
            mainMethods: ["Motorbike rental", "Private driver", "Taxi apps (Grab, Gojek)", "Tourist shuttle"],
            tips: [
                "Negotiate prices beforehand with private drivers",
                "Traffic can be heavy, allow extra time",
                "Motorbike is most flexible but requires caution"
            ]
        },
        attractions: [
            "Uluwatu Temple",
            "Tegallalang Rice Terraces",
            "Sacred Monkey Forest Sanctuary",
            "Mount Batur sunrise trek",
            "Seminyak beaches",
            "Ubud cultural center"
        ]
    },

    {
        id: "7",
        slug: "istanbul-turkey",
        name: "Istanbul, Turkey",
        description: "Where Europe meets Asia, this historic city offers Byzantine and Ottoman heritage, vibrant bazaars, and rich culinary traditions.",
        placeType: "city",
        country: "Turkey",
        state: "Istanbul",
        city: "Istanbul",
        coordinates: {
            latitude: 41.0082,
            longitude: 28.9784
        },
        population: 15519267,
        timezone: "Europe/Istanbul",
        languages: ["tr", "en", "ar"],
        currency: "TRY",
        overview: {
            image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=600&fit=crop",
            thumbnail: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&fit=crop",
            bestTimeToVisit: "April-May, September-November",
            averageStayDuration: "3-5 days",
            popularWith: ["History enthusiasts", "Architecture lovers", "Food tourists", "Cultural explorers"]
        },
        culture: {
            dos: [
                "Remove shoes when entering mosques",
                "Dress conservatively at religious sites",
                "Bargain at markets and bazaars",
                "Accept Turkish tea (çay) when offered",
                "Try traditional Turkish breakfast"
            ],
            donts: [
                "Don't show soles of feet to others",
                "Don't refuse hospitality - it may be offensive",
                "Don't be impatient - take time for conversations",
                "Don't eat or drink publicly during Ramadan",
                "Don't photograph people without permission"
            ],
            customs: [
                "Hospitality (misafirperverlik) is central to Turkish culture",
                "Tea culture is important for socializing",
                "Respect for elders is deeply ingrained"
            ],
            etiquette: {
                dining: "Wait for eldest to start eating, finish everything served",
                public: "Conservative dress, especially for women",
                business: "Personal relationships precede business discussions"
            }
        },
        safety: {
            overallRating: 7.3,
            crimeRate: "Low-Medium",
            commonRisks: ["Pickpocketing in tourist areas", "Political demonstrations", "Earthquake risk"],
            emergencyNumber: "112",
            safeTimes: "Generally safe during day, exercise normal caution at night",
            recommendations: [
                "Stay aware in crowded tourist areas",
                "Avoid political gatherings and demonstrations",
                "Keep passport copy separate from original",
                "Use reputable tour guides and services"
            ]
        },
        transportation: {
            mainMethods: ["Metro", "Tram", "Buses", "Dolmuş (shared taxi)", "Ferry", "Taxi"],
            tips: [
                "Get IstanbulKart for all public transport",
                "Ferry rides offer beautiful Bosphorus views",
                "Traffic can be intense - use public transport"
            ]
        },
        attractions: [
            "Hagia Sophia",
            "Blue Mosque",
            "Topkapi Palace",
            "Grand Bazaar",
            "Basilica Cistern",
            "Bosphorus cruise"
        ]
    },

    {
        id: "8",
        slug: "cape-town-south-africa",
        name: "Cape Town, South Africa",
        description: "The Mother City nestled between mountains and ocean, offering wine regions, stunning landscapes, and rich cultural diversity.",
        placeType: "city",
        country: "South Africa",
        state: "Western Cape",
        city: "Cape Town",
        coordinates: {
            latitude: -33.9249,
            longitude: 18.4241
        },
        population: 4618000,
        timezone: "Africa/Johannesburg",
        languages: ["en", "af", "xh"],
        currency: "ZAR",
        overview: {
            image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&h=600&fit=crop",
            thumbnail: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&h=300&fit=crop",
            bestTimeToVisit: "November-March (summer)",
            averageStayDuration: "4-7 days",
            popularWith: ["Wine enthusiasts", "Adventure seekers", "Nature lovers", "History buffs"]
        },
        culture: {
            dos: [
                "Learn about apartheid history respectfully",
                "Support local communities and businesses",
                "Try local cuisine and wines",
                "Greet people warmly - South Africans are friendly",
                "Respect cultural diversity and traditions"
            ],
            donts: [
                "Don't ignore safety advice from locals",
                "Don't make insensitive comments about apartheid",
                "Don't display wealth ostentatiously",
                "Don't venture into townships without guides",
                "Don't expect everything to run on time"
            ],
            customs: [
                "Ubuntu philosophy - 'I am because we are'",
                "Braai (barbecue) culture is central to social life",
                "Multiple languages spoken in daily life"
            ],
            etiquette: {
                dining: "Braai invitations are special, bring something to share",
                public: "Friendly greetings are common, personal space respected",
                business: "Punctuality valued, relationship building important"
            }
        },
        safety: {
            overallRating: 6.0,
            crimeRate: "Medium-High",
            commonRisks: ["Violent crime", "Theft", "Carjacking", "Township crime"],
            emergencyNumber: "10111 (Police), 10177 (Medical)",
            safeTimes: "Be very cautious, especially at night and in certain areas",
            recommendations: [
                "Don't walk alone at night",
                "Use hotel safes for valuables",
                "Take guided tours for townships",
                "Stay in tourist-friendly areas",
                "Don't resist if robbed - personal safety first"
            ]
        },
        transportation: {
            mainMethods: ["Rental car", "Uber/Bolt", "MyCiTi buses", "Tourist shuttles", "Guided tours"],
            tips: [
                "Rental car gives most flexibility",
                "Use ride-sharing apps for safety",
                "Don't walk long distances, even during day"
            ]
        },
        attractions: [
            "Table Mountain",
            "Robben Island",
            "V&A Waterfront",
            "Cape Winelands",
            "Boulder's Beach Penguins",
            "Chapman's Peak Drive"
        ]
    }

];

