"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";

type Meeting = {
  id: string;
  clubId: string;
  club: string;
  tags: string[];
  date: string;
  time: string;
  roomNumber: string;
  notes: string;
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

function getClubColor(tags: string[]): string {
  for (const tag of tags) {
    if (TAG_COLORS[tag]) return TAG_COLORS[tag];
  }
  return "#6b7280";
}

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [hovered, setHovered] = useState<{
    meeting: Meeting;
    x: number;
    y: number;
  } | null>(null);

  // Fetch meetings whenever the displayed month/year changes
  const [viewMonth, setViewMonth] = useState(new Date());

  useEffect(() => {
    const month = viewMonth.getMonth() + 1;
    const year = viewMonth.getFullYear();
    axios
      .get<{ meetings: Meeting[] }>(`/api/meetings?month=${month}&year=${year}`)
      .then((res) => setMeetings(res.data.meetings))
      .catch((err) => console.error("Failed to fetch meetings:", err));
  }, [viewMonth]);

  const DayContent = ({ day }: { day: Date }) => {
    const dateStr = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
    const dayMeetings = meetings.filter((m) => m.date === dateStr);

    return (
      <div className="flex flex-col items-center gap-0.5 w-full">
        <span>{day.getDate()}</span>
        {dayMeetings.map((meeting) => (
          <button
            key={meeting.id}
            //fill in actual url later
            onClick={() =>
              (window.location.href = "/individual-club/${meeting.id}")
            }
            className="text-[10px] lg:text-[12px] px-1.5 py-0.5 rounded-full text-white text-center truncate max-w-[10ch]"
            style={{ backgroundColor: getClubColor(meeting.tags) }}
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setHovered({ meeting, x: rect.left, y: rect.bottom });
            }}
            onMouseLeave={() => setHovered(null)}
          >
            {meeting.club}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen px-10 py-6">
      <section className="flex flex-col items-center gap-6">
        <h2 className="text-3xl font-bold text-navy">Upcoming Meetings</h2>
        <Card className="w-3/5 md:w-1/2 lg:w-3/5">
          <CardContent className="content-center w-9/10">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              onMonthChange={setViewMonth}
              fixedWeeks
              className="rounded-lg w-full [--cell-size:--spacing(4)] md:[--cell-size:--spacing(3)] lg:[--cell-size:--spacing(0)]"
              classNames={{
                caption_label: "text-xl font-semibold",
                day: "h-16 w-full p-0 flex items-right justify-center",
              }}
              components={{
                DayButton: ({ day, ...props }) => (
                  <button 
                  {...props}
                  >
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
          <p className="text-xs text-gray-500">
            Time: {hovered.meeting.time}
          </p>
          <p className="text-xs text-gray-500 truncate max-w-[200px]">
            {hovered.meeting.notes}
          </p>
        </div>
      )}
    </div>
  );
}