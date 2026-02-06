import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
    // get the amount of anouncements from the query params
    try {
        const { searchParams } = new URL(request.url);
        const amount = searchParams.get("amount") || "5";
        
        // validate that the amount is a number and is between 1 and 20
        const amountNumber = parseInt(amount, 10);
        if (isNaN(amountNumber) || amountNumber < 1 || amountNumber > 20) {
            return NextResponse.json(
                { error: "Amount must be a number between 1 and 20" },
                { status: 400 }
            );
        }

        const announcements = await db.announcement.findMany({
            orderBy: {
                createdAt: "desc",
            },
            take: amountNumber,
        });

        return NextResponse.json(announcements);
    } catch (error) {
        console.error("Error fetching announcements:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching announcements" },
            { status: 500 }
        );

    }
}   


