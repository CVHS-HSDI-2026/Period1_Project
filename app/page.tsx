"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Announcement {
  id: string;
  title: string;
  content: string;
  images: string[];
  club: {
    name: string;
    roomNumber: string;
  };
}

export default function Home() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [lightbox, setLightbox] = useState<{ images: string[]; start: number } | null>(null);

  useEffect(() => {
    // axios
    //   .get<Announcement[]>("/api/announcements?amount=5")
    //   .then((res) => setAnnouncements(res.data))
    //   .catch((err) => console.error("Failed to fetch announcements:", err));
  }, []);

  // Placeholder data while fetch is commented out (ai generated)
  const displayAnnouncements: Announcement[] =
    announcements.length > 0
      ? announcements
      : [
          {
            id: "1",
            title: "Weekly Meeting Cancelled",
            content: "This week's meeting is cancelled due to the holiday.",
            images: [
              "https://placehold.co/400x200/e2e8f0/475569?text=Photo+1",
              "https://placehold.co/400x200/e2e8f0/475569?text=Photo+2",
            ],
            club: { name: "Robotics Club", roomNumber: "204" },
          },
          {
            id: "2",
            title: "Bake Sale Fundraiser",
            content:
              "Join us Friday for our annual bake sale! All proceeds go to competition fees.",
            images: [
              "https://placehold.co/400x200/e2e8f0/475569?text=Bake+Sale",
            ],
            club: { name: "Key Club", roomNumber: "118" },
          },
          {
            id: "3",
            title: "New Members Welcome",
            content: "Open enrollment is here. Stop by to sign up!",
            images: [],
            club: { name: "Drama Club", roomNumber: "Auditorium" },
          },
        ];

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto flex max-w-3xl flex-col gap-12">
        {/* Announcements Section */}
        <section className="flex flex-col items-center gap-6">
          <h2 className="text-3xl font-bold text-[#001f3f]">Announcements</h2>
          <Carousel className="w-full max-w-xl">
            <CarouselContent>
              {displayAnnouncements.map((a) => (
                <CarouselItem key={a.id}>
                  <div className="flex flex-col rounded-xl bg-white shadow overflow-hidden">
                    {/* Header: club name + room number */}
                    <div className="flex items-center justify-between px-5 pt-4">
                      <span className="text-xl font-bold text-[#001f3f]">
                        {a.club.name}
                      </span>
                      <span className="text-xl font-bold text-[#001f3f]">
                        {a.club.roomNumber}
                      </span>
                    </div>

                    {/* Title + content */}
                    <div className="px-5 pt-3 pb-4">
                      <h3 className="text-lg font-semibold text-zinc-800">
                        {a.title}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-500">{a.content}</p>
                    </div>

                    {/* Image thumbnails */}
                    {a.images.length > 0 && (
                      <div className="flex gap-2 border-t border-zinc-100 px-5 py-3">
                        {a.images.map((src, i) => (
                          <button
                            key={i}
                            onClick={() => setLightbox({ images: a.images, start: i })}
                            className="overflow-hidden rounded-md transition-opacity hover:opacity-80"
                          >
                            <Image
                              src={src}
                              alt={`${a.title} image ${i + 1}`}
                              width={80}
                              height={80}
                              className="h-16 w-16 object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        {/* Today's Meetings Section */}
        <section className="flex flex-col items-center gap-6">
          <h2 className="text-3xl font-bold text-[#001f3f]">
            Today&apos;s Meetings
          </h2>
          <div className="h-48 w-full max-w-xl rounded-xl bg-white shadow" />
        </section>
      </div>

      {/* Fullscreen image lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <Carousel
            className="w-full max-w-3xl px-12"
            opts={{ startIndex: lightbox.start }}
          >
            <CarouselContent>
              {lightbox.images.map((src, i) => (
                <CarouselItem key={i} className="flex items-center justify-center">
                  <Image
                    src={src}
                    alt={`Image ${i + 1}`}
                    width={1200}
                    height={800}
                    className="max-h-[80vh] w-auto rounded-lg object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
    </div>
  );
}
