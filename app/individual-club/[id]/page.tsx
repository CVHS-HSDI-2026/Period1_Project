"use client";

import * as React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ClubPerson = {
  name: string;
  role: string;
  contact: string;
};

type ClubDetails = {
  id: string;
  name: string;
  description: string;
  photoUrl: string;
  people: ClubPerson[];
};

const PLACEHOLDER_CLUBS: Record<string, ClubDetails> = {
  "1": {
    id: "1",
    name: "Robotics Club",
    description:
      "Build and program robots to compete in regional and national competitions.",
    photoUrl: "https://placehold.co/600x300/e2e8f0/475569?text=Robotics",
    people: [
      { name: "John Doe", role: "President", contact: "JohnDoe@school.edu" },
      { name: "Jane Smith", role: "Vice President", contact: "jane.smith@school.edu" },
      { name: "Name 3", role: "Secretary", contact: "Name3@school.edu" },
    ],
  },
  "2": {
    id: "2",
    name: "Key Club",
    description:
      "Community service organization dedicated to helping others and building character.",
    photoUrl: "https://placehold.co/600x300/e2e8f0/475569?text=Key+Club",
    people: [
      { name: "Lil boy", role: "President", contact: "lilboy@school.edu" },
      { name: "flightreacts", role: "Treasurer", contact: "flightreacts@school.edu" },
    ],
  },
};

export default function IndividualClubPage({ params }: { params: { id: string } }) {
  const club =
    PLACEHOLDER_CLUBS[params.id] ??
    ({
      id: params.id,
      name: "Club",
      description: "Club description goes here.",
      photoUrl: "https://placehold.co/600x300/e2e8f0/475569?text=Club",
      people: [
        { name: "Officer Name", role: "Role", contact: "contact@school.edu" },
      ],
    } satisfies ClubDetails);

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[360px_1fr]">

          <div className="relative h-[220px] w-full overflow-hidden rounded-xl border bg-white">
            <Image src={club.photoUrl} alt={club.name} fill className="object-cover" />
          </div>

          <div className="flex h-[220px] flex-col justify-center rounded-xl border bg-white px-6 py-6">
            <h1 className="text-3xl font-bold text-gray-900">{club.name}</h1>
            <p className="mt-3 text-sm text-gray-600">{club.description}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[360px_1fr]">
          <div className="flex flex-col gap-4">
            <Card className="gap-4 py-5">
              <CardHeader className="pb-0">
                <CardTitle className="text-base">People</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-col gap-3">
                  {club.people.map((p) => (
                    <div
                      key={`${p.name}-${p.role}`}
                      className="flex items-start justify-between gap-4 rounded-lg border bg-white px-4 py-3"
                    >
                      <div className="min-w-0">
                        <div className="truncate font-medium text-gray-900">
                          {p.name}
                        </div>
                        <div className="text-sm text-gray-600">{p.role}</div>
                      </div>
                      <a
                        className="shrink-0 text-sm text-baby-blue hover:underline"
                        href={`mailto:${p.contact}`}
                      >
                        {p.contact}
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" type="button">
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

