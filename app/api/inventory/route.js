import connectMongoDB from "@/libs/mongodb";
import Inventory from "@/models/inventory";
import { NextResponse } from "next/server";

export async function GET(request) {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    const agent = searchParams.get('agent')

    const result = await Inventory.find({ agent })

    if (!result) {
        return NextResponse.json({ message: 'Something Wrong', success: false }, { status: 500 });

    } else {

        return NextResponse.json(result);
    };

}

export async function POST(request) {
    await connectMongoDB();

    const data = await request.json();

    const result = await Inventory.create(data);

    if (!result) {
        return NextResponse.json({ message: 'Something Wrong', success: false }, { status: 500 });

    } else {

        return NextResponse.json({ message: 'Data successfully saved in database', success: true }, { status: 200 });
    };
};