"use client";

import * as React from "react";
import Image from "next/image";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";

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
  signUpLink: string;
  tags: string[];
  people: ClubPerson[];
};

export default function IndividualClubPage({ params }: { params: { id: string } }) {
  const [club, setClub] = React.useState<ClubDetails | null>(null);
  const [notFound, setNotFound] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

  React.useEffect(() => {
    axios
      .get<ClubDetails>(`/api/clubs/${params.id}`)
      .then((res) => setClub(res.data))
      .catch((err) => {
        console.error("Failed to fetch club:", err);
        if (err.response?.status === 404) setNotFound(true);
      });
  }, [params.id]);

  if (notFound) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-white/70 text-lg">Club not found.</p>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-white/70 text-lg">Loading...</p>
      </div>
    );
  }

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

            <Button className="w-full" type="button" asChild>
              <a href={club.signUpLink} target="_blank" rel="noopener noreferrer">
                Sign up
              </a>
            </Button>
          </div>

          <Card className="gap-4 py-5">
            <CardHeader className="pb-0">
              <CardTitle className="text-base">Calendar</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  fixedWeeks
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
