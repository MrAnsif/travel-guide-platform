import { searchOrGeneratePlace, searchPlaces } from "../../../lib/Places"
import { NextResponse } from "next/server"


export async function GET(req) {

    try {
        const { searchParams } = new URL(req.url)
        const query = searchParams.get('q')
        const limit = parseInt(searchParams.get('limit')) || 10

        if (!query || query.length < 2) {
            return NextResponse.json([], { status: 200 })
        }

        // const results = await searchPlaces(query, limit)
        const results = await searchOrGeneratePlace(query, limit)
        console.log('search res:', results)
        const response = NextResponse.json(results.results)

        response.headers.set(
            'Cache-Control',
            'public, s-maxage=120, stale-while-revalidate=59'
        )
        return response

    } catch (error) {
        console.error('API error at search', error);
        return NextResponse.json([], { status: 200 })
    }
}