import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const month = parseInt(searchParams.get("month") || String(new Date().getMonth() + 1), 10);
        const year = parseInt(searchParams.get("year") || String(new Date().getFullYear()), 10);

        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 1);

        const meetings = await db.meeting.findMany({
            where: {
                date: { gte: start, lt: end },
            },
            select: {
                id: true,
                date: true,
                time: true,
                roomNumber: true,
                Notes: true,
                club: {
                    select: { id: true, name: true, tags: true },
                },
            },
            orderBy: { date: "asc" },
        });

        const formatted = meetings.map((m) => ({
            id: m.id,
            clubId: m.club.id,
            club: m.club.name,
            tags: m.club.tags,
            date: m.date.toISOString().slice(0, 10),
            time: m.time.toISOString().slice(11, 16), // "HH:MM" UTC
            roomNumber: m.roomNumber,
            notes: m.Notes ?? "",
        }));

        return NextResponse.json({ meetings: formatted });
    } catch (error) {
        console.error("Error fetching meetings:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching meetings" },
            { status: 500 }
        );
    }
}
