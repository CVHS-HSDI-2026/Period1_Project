import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
    _request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const club = await db.club.findUnique({
            where: { id: params.id },
            select: {
                id: true,
                name: true,
                description: true,
                photoUrl: true,
                signUpLink: true,
                tags: true,
                advisorName: true,
                advisorEmail: true,
                officers: {
                    select: {
                        user: {
                            select: { name: true, email: true },
                        },
                    },
                },
            },
        });

        if (!club) {
            return NextResponse.json({ error: "Club not found" }, { status: 404 });
        }

        const people = [
            { name: club.advisorName, role: "Advisor", contact: club.advisorEmail },
            ...club.officers.map((o) => ({
                name: o.user.name ?? "Officer",
                role: "Officer",
                contact: o.user.email,
            })),
        ];

        return NextResponse.json({
            id: club.id,
            name: club.name,
            description: club.description,
            photoUrl: club.photoUrl,
            signUpLink: club.signUpLink,
            tags: club.tags,
            people,
        });
    } catch (error) {
        console.error("Error fetching club:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching club" },
            { status: 500 }
        );
    }
}
