"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";

type Meeting = {
  id: string;
  club: string;
  roomNumber: string;
  time: string;
  date: string;
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
    time: "Lunch",
    roomNumber: "7201",
  },
  {
    id: "2",
    club: "Drama Club",
    date: "2026-03-05",
    time: "Lunch",
    roomNumber: "8202",
  },
  {
    id: "3",
    club: "Robotics Club",
    date: "2026-03-10",
    time: "Snack",
    roomNumber: "8104",
  },
  {
    id: "4",
    club: "Art Club",
    date: "2026-03-15",
    time: "Lunch",
    roomNumber: "5203",
  },
  {
    id: "5",
    club: "Chess Club",
    date: "2026-03-20",
    time: "Snack",
    roomNumber: "7207",
  },
  {
    id: "6",
    club: "Math Club",
    date: "2026-03-20",
    time: "Snack",
    roomNumber: "7302",
  },
  {
    id: "7",
    club: "Science Olympiad",
    date: "2026-03-25",
    time: "Lunch",
    roomNumber: "2205",
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
            className="text-[10px] px-1.5 py-0.5 rounded-full text-white w-full text-center truncate"
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
    <div className="min-h-screen px-6 py-12">
      <section className="flex flex-col items-center gap-6">
        <h2 className="text-3xl font-bold text-navy">Upcoming Meetings</h2>
        <Card className="w-1/2">
          <CardContent className="content-center w-full">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg w-full [--cell-size:--spacing(16)] md:[--cell-size:--spacing(20)]"
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
            Room {hovered.meeting.roomNumber}
          </p>
          <p className="text-xs text-gray-500">Time: {hovered.meeting.time}</p>
        </div>
      )}
    </div>
  );
}
