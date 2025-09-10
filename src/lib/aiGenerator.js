export async function generatePlaceData(placeName, placeDetails) {
    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': process.env.VERCEL_URL || 'http://localhost:3000', // Add referer for OpenRouter
                'X-Title': 'Travel Place Generator' // Add title for OpenRouter
            },
            body: JSON.stringify({
                model: "mistralai/mistral-small-3.1-24b-instruct:free",
                messages: [
                    {
                        role: "system",
                        content: `You are an expert travel and cultural guide with deep knowledge of global destinations, local customs, safety conditions, and practical travel information.

                        CRITICAL INSTRUCTIONS FOR CRIME RATE DATA:
- Research actual crime statistics for the destination and country
- Use real crime index values from reliable sources (Global Peace Index, Numbeo, etc.)
- Provide 5 years of historical data (2020-2024) 
- Crime rates should be realistic numbers based on actual data, NOT example values
- Compare destination crime rate vs national average accurately
- If exact data unavailable, make reasonable estimates based on similar locations

CRITICAL: Your response must be ONLY valid JSON in this exact structure with no additional text, explanations, or markdown formatting:

{
  "name": "Full official name",
  "slug": "url-friendly-slug", 
  "description": "Detailed 3-4 sentence engaging description",
  "placeType": "district|city|neighborhood...",
  "country": "Country name",
  "state": "State/region if applicable or null",
  "city": "City name", 
  "coordinates": {
    "latitude": number,
    "longitude": number
  },
  "population": number,
  "timezone": "Continent/City",
  "languages": ["primary", "secondary"],
  "currency": "Currency code",
  "emergencyNumber": "Local emergency number",
  "overview": {
    "bestTimeToVisit": "Season or months",
    "averageStayDuration": "e.g., 2-3 days", 
    "popularWith": ["type of travelers"]
  },
  "culture": {
    "dos": ["5-7 specific cultural do's"],
    "donts": ["5-7 specific cultural don'ts"], 
    "customs": ["3-5 unique local customs"],
    "etiquette": {
      "dining": "Specific dining etiquette",
      "public": "Public behavior norms", 
      "business": "Business etiquette if applicable"
    }
  },
  "safety": {
    "overallRating": 8.5,
    "interpretedCrimeRate": [
      { "year": 2020, "destinationCrimeRate": REAL_NUMBER_VALUE, "countryAvgCrimeRate": REAL_NUMBER_VALUE },
      { "year": 2021, "destinationCrimeRate": REAL_NUMBER_VALUE, "countryAvgCrimeRate": REAL_NUMBER_VALUE },
      { "year": 2022, "destinationCrimeRate": REAL_NUMBER_VALUE, "countryAvgCrimeRate": REAL_NUMBER_VALUE },
      { "year": 2023, "destinationCrimeRate": REAL_NUMBER_VALUE, "countryAvgCrimeRate": REAL_NUMBER_VALUE },
      { "year": 2024, "destinationCrimeRate": REAL_NUMBER_VALUE, "countryAvgCrimeRate": REAL_NUMBER_VALUE }
    ],
    "commonRisks": ["specific risks"],
    "recommendations": ["practical safety tips"]
  },
  "transportation": {
    "mainMethods": ["primary transport options"],
    "tips": ["practical transportation tips"]
  },
  "attractions": ["5-8 main attractions"]
}

Ensure all data is accurate, culturally sensitive, and practical/useful for travelers.
Ensure to respond in simple English.`
                    },
                    {
                        role: "user",
                        content: `Generate comprehensive travel guide data for: ${placeName}${placeDetails ? ` - ${placeDetails}` : ''}`
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
        console.error('AI generation error:', {
            message: error.message,
            stack: error.stack,
            placeName,
            placeDetails
        });
        throw error; // CRITICAL: Re-throw the error
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
            placeType: parsed.placeType || 'Unknown',
            country: parsed.country || 'Unknown',
            state: parsed.state || null,
            city: parsed.city || 'Unknown',
            coordinates: parsed.coordinates || { latitude: 0, longitude: 0 },
            population: parsed.population || 0,
            timezone: parsed.timezone || 'UTC',
            languages: parsed.languages || ['English'],
            currency: parsed.currency || 'USD',
            emergencyNumber: parsed.emergencyNumber || '',
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
                interpretedCrimeRate: parsed.safety?.interpretedCrimeRate || [],
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
        throw new Error(`Failed to parse AI response: ${error.message}`); // Throw instead of returning []
    }
}

// get unsplash image
async function getPlaceImage(name, country) {
    try {
        const query = encodeURIComponent(`${name} ${country} placetovisit`);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`, {
            signal: controller.signal,
            headers: {
                'Accept': 'application/json'
            }
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            console.error('Unsplash API error:', response.status);
            return null;
        }

        const data = await response.json();
        console.log('unsplash link:', data.results?.[0]?.urls?.regular)
        return data.results?.[0]?.urls?.regular
    } catch (error) {
        console.error('Image fetch error:', error);
    }
    return null;
}
