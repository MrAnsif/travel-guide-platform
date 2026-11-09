import { NextResponse } from "next/server";
import { generateAndSavePlace } from "../../../../lib/Places";

export async function POST(request) {
    try {
        const { placeName, placeDetails } = await request.json();

        if (!placeName) {
            return NextResponse.json(
                { error: 'Place name is required' },
                { status: 400 }
            );
        }

        const generatedPlace = await generateAndSavePlace(placeName, placeDetails);

        return NextResponse.json({
            success: true,
            data: generatedPlace
        });

    } catch (error) {
        console.error('Place generation error:', error.message);

        // Classify error type for frontend — never expose raw stack/internals
        let errorCode = 'GENERATION_FAILED';
        let status = 500;

        if (error.message?.includes('Unauthorized') || error.message?.includes('check API key')) {
            errorCode = 'AI_SERVICE_ERROR';
            status = 503;
        } else if (error.message?.includes('Model not found') || error.message?.includes('deprecated')) {
            errorCode = 'AI_SERVICE_ERROR';
            status = 503;
        } else if (error.message?.includes('Rate limited')) {
            errorCode = 'AI_SERVICE_ERROR';
            status = 503;
        } else if (error.message?.includes('AI API error')) {
            errorCode = 'AI_SERVICE_ERROR';
            status = 503;
        } else if (error.message?.includes('parse') || error.message?.includes('incomplete') || error.message?.includes('insufficient')) {
            errorCode = 'AI_PARSE_ERROR';
            status = 502;
        } else if (error.message?.includes('save') || error.message?.includes('prisma') || error.message?.includes('Failed to save')) {
            errorCode = 'DB_SAVE_ERROR';
            status = 500;
        }

        return NextResponse.json(
            { success: false, errorCode },
            { status }
        );
    }
}