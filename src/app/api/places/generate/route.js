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
        console.error('Place generation error:', error);
        return NextResponse.json(
            { error: 'Failed to generate place data' },
            { status: 500 }
        );
    }
}