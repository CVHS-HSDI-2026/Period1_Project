import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { email, name, graduationYear } = body;

    if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await db.user.update({
        where: { email },
        data: {
            name,
            student: {
                update: {
                    graduationYear,
                },
            },
        },
        select: {
            name: true,
            email: true,
            student: {
                select: {
                    graduationYear: true,
                },
            },
        },
    });

    return NextResponse.json(user);
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await db.user.findUnique({
        where: { email },
        select: {
            name: true,
            email: true,
            student: {
                select: {
                    graduationYear: true,
                },
            },
        },
    });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
}
