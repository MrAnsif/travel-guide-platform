import { getAllPlaces } from "../../../lib/Places"
import { NextResponse } from "next/server"


export async function GET(req) {
    try {

        const { searchParams } = new URL(req.url)
        const page = parseInt(searchParams.get('page')) || 1
        const limit = parseInt(searchParams.get('limit')) || 20
        const cursor = searchParams.get('cursor')

        if (page < 1) {
            return NextResponse.json(
                { error: 'Page must be positive' },
                { status: 400 }
            )
        }

        const result = await getAllPlaces({ page, limit, cursor })

        const response = NextResponse.json(result)

        response.headers.set(
            'Cache-Control',
            'public, s-maxage=300, stale-while-revalidate=59'
        )

        return response

    } catch (error) {
        console.error('API error at places', error)

        return NextResponse.json(
            { error: 'Server error' },
            { status: 500 }
        )
    }
}