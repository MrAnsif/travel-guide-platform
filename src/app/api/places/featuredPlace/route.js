import { getFeaturedPlaces } from "../../../../lib/Places";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const featuredPlace = await getFeaturedPlaces(6)

        if (!featuredPlace) {
            return NextResponse.json(
                { error: 'No place founded' },
                { status: 404 }
            )
        }
        return NextResponse.json(featuredPlace)

    } catch (error) {
        console.error('api error at get featured place: ', error)
        return NextResponse.json(
            { error: 'Failed to fetch featured place' },
            { status: 500 }
        );
    }
}