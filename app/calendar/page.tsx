"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"

export default function CalendarPage() {
    // const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
        <div className="min-h-screen px-6 py-12">
            <section className="flex flex-col items-center gap-6">
                <h2 className="text-3xl font-bold text-navy">Upcoming Meetings</h2>
                <Card>
                    <CardContent className="content-center">
                        <Calendar
                            mode="single"
                            className="rounded-lg m-auto [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
                        />
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}