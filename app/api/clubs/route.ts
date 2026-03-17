import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get("search") || "";
        const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
        const pageSize = Math.min(20, Math.max(1, parseInt(searchParams.get("pageSize") || "9", 10)));

        const where = search
            ? { name: { contains: search, mode: "insensitive" as const } }
            : {};

        const [clubs, total] = await Promise.all([
            db.club.findMany({
                where,
                select: {
                    id: true,
                    name: true,
                    description: true,
                    photoUrl: true,
                    tags: true,
                },
                orderBy: { name: "asc" },
                skip: (page - 1) * pageSize,
                take: pageSize,
            }),
            db.club.count({ where }),
        ]);

        return NextResponse.json({
            clubs,
            totalPages: Math.ceil(total / pageSize),
            currentPage: page,
        });
    } catch (error) {
        console.error("Error fetching clubs:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching clubs" },
            { status: 500 }
        );
    }
}
