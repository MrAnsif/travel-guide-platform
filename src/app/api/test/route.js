import { getPlaceBySlug, insertPlace } from "../../../lib/Places";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await getPlaceBySlug('kollam')
    return NextResponse.json(data)
}

export async function POST() {
    const data = await insertPlace()
    return NextResponse.json(data)
}