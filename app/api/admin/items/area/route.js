import connectMongoDB from "@/libs/mongodb";
import AreaItem from "@/models/items/area";
import { NextResponse } from "next/server";


// Area POST
export async function POST(request) {
    await connectMongoDB();
    const data = await request.json();

    await AreaItem.create(data);
    return NextResponse.json({ message: 'item successfully save to database', success: true }, { status: 200 })
} 