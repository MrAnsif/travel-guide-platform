export async function generatePlaceData(placeName) {
    try {
        // Use the Edge Runtime compatible approach
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
                        content: "You are a knowledgeable travel expert and cultural guide. Provide accurate, helpful information."
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
            throw new Error(`AI API error: ${response.status}`);
        }

        const data = await response.json();
        const content = data.choices[0]?.message?.content;

        if (!content) {
            throw new Error('No content generated');
        }

        // Parse and return structured data
        return parseAIResponse(content, placeName);

    } catch (error) {
        console.error('AI generation error:', error);
        // Fallback to basic data structure
        return createFallbackData(placeName);
    }
}