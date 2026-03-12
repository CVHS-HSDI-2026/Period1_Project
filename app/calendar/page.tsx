"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";

type Meeting = {
  id: string;
  club: string;
  location: string;
  startTime: string;
  endTime: string;
  date: string;
  desc: string;
};

const TAG_COLORS: Record<string, string> = {
  STEM: "#f97316",
  Service: "#3b82f6",
  Arts: "#a855f7",
  Creative: "#ec4899",
  Strategy: "#22c55e",
  Competition: "#ef4444",
  Speaking: "#14b8a6",
  Environment: "#84cc16",
};

const CLUB_TAGS: Record<string, string> = {
  "Robotics Club": "STEM",
  "Key Club": "Service",
  "Drama Club": "Arts",
  "Chess Club": "Strategy",
  "Debate Club": "Speaking",
  "Art Club": "Arts",
  "Science Olympiad": "STEM",
  "Photography Club": "Creative",
  "Environmental Club": "Environment",
  "Math Club": "STEM",
};

function getClubColor(club: string): string {
  const tag = CLUB_TAGS[club];
  return TAG_COLORS[tag] ?? "#6b7280";
}

const MOCK_MEETINGS: Meeting[] = [
  {
    id: "1",
    club: "Key Club",
    date: "2026-03-05",
    startTime: "1:00 PM",
    endTime: "1:20 PM",
    location: "7201",
    desc: "Discussing volunteer events!...",
  },
  {
    id: "2",
    club: "Drama Club",
    date: "2026-03-05",
    startTime: "12:55",
    endTime: "1:20",
    location: "8202",
    desc: "Going over new scripts...",
  },
  {
    id: "3",
    club: "Robotics Club",
    date: "2026-03-10",
    startTime: "10:30",
    endTime: "10:40",
    location: "8104",
    desc: "Handing out shirts...",
  },
  {
    id: "4",
    club: "Art Club",
    date: "2026-03-15",
    startTime: "12:55",
    endTime: "1:20",
    location: "5203",
    desc: "Organizing art supplies...",
  },
  {
    id: "5",
    club: "Chess Club",
    date: "2026-03-20",
    startTime: "10:30",
    endTime: "10:40",
    location: "7207",
    desc: "Registering...",
  },
  {
    id: "6",
    club: "Math Club",
    date: "2026-03-20",
    startTime: "10:30",
    endTime: "10:44",
    location: "7302",
    desc: "Math...",
  },
  {
    id: "7",
    club: "Science Olympiad",
    date: "2026-03-25",
    startTime: "12:55",
    endTime: "1:20",
    location: "2205",
    desc: "Science...",
  },
];

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [hovered, setHovered] = useState<{
    meeting: Meeting;
    x: number;
    y: number;
  } | null>(null);

  const DayContent = ({ day }: { day: Date }) => {
    const dateStr = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
    const dayMeetings = MOCK_MEETINGS.filter((m) => m.date === dateStr);

    return (
      <div className="flex flex-col items-center gap-0.5 w-full">
        <span>{day.getDate()}</span>
        {dayMeetings.map((meeting) => (
          <span
            key={meeting.id}
            className="text-[10px] px-1.5 py-0.5 rounded-full text-white max-w-full text-center truncate block"
            style={{ backgroundColor: getClubColor(meeting.club) }}
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setHovered({ meeting, x: rect.left, y: rect.bottom });
            }}
            onMouseLeave={() => setHovered(null)}
          >
            {meeting.club}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen px-0 py-12">
      <section className="flex flex-col items-center gap-6">
        <h2 className="text-3xl font-bold text-navy">Upcoming Meetings</h2>
        <Card className="w-3/5">
          <CardContent className="content-center w-full">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              fixedWeeks
              className="rounded-lg w-full [--cell-size:--spacing(8)] md:[--cell-size:--spacing(12))]"
              classNames={{
                caption_label: "text-xl font-semibold",
              }}
              components={{
                DayButton: ({ day, ...props }) => (
                  <button {...props}>
                    <DayContent day={day.date} />
                  </button>
                ),
              }}
            />
          </CardContent>
        </Card>
      </section>

      {/* Hover popup */}
      {hovered && (
        <div
          className="fixed z-50 bg-white border rounded-xl shadow-xl p-4 w-56 pointer-events-none"
          style={{ left: hovered.x, top: hovered.y + 8 }}
        >
          <p className="font-semibold text-sm mb-2">{hovered.meeting.club}</p>
          <p className="text-xs text-gray-500">
            Room {hovered.meeting.location}
          </p>
          <p className="text-xs text-gray-500">
            Start Time: {hovered.meeting.startTime}
          </p>
          <p className="text-xs text-gray-500">
            End Time: {hovered.meeting.endTime}
          </p>
          <p className="text-xs text-gray-500">{hovered.meeting.desc}</p>
        </div>
      )}
    </div>
  );
}
