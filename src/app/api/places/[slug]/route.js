import { getPlaceBySlug } from "../../../../lib/Places"
import { NextResponse } from "next/server"


// export const dynamic = 'force-dynamic'; 

export async function GET(req, { params }) {
    const { slug } = await params
    try {

        if (!slug) {
            return NextResponse.json(
                { error: 'slug is required' },
                { status: 400 },
            )
        }

        const place = await getPlaceBySlug(slug)

        if (!place) {
            return NextResponse.json(
                { error: 'No plaace fonuded' },
                { status: 404 }
            )
        }

        const response = NextResponse.json(place)

        response.headers.set(
            'Cache-Control',
            'public, s-maxage=3600, stale-while-revalidate=59'
        )

        return response

    } catch (error) {
        console.error('api error at get place by slug', error)
        return NextResponse.json(
            { error: 'Failed to fetch place data' },
            { status: 500 }
        );
    }
}