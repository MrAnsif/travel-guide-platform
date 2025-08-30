import { getPlaceBySlug, insertPlace } from "../../../lib/Places";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await getPlaceBySlug('shinjuku-tokyo-japan')
    return NextResponse.json(data)
}

export async function POST() {
    const data = await insertPlace()
    return new NextResponse(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}


