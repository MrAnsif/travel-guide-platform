import { getPlaceBySlug } from "../../../lib/Places";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await getPlaceBySlug('morocco')
    return NextResponse.json(data)
}

