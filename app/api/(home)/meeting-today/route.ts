import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
    try {
        // todays date
        const today = new Date();
        const clubs = await db.club.findMany({
            include: {
                meetings: true
            }
        });

        const clubsWithMeetingsToday = (() => {
            let meet: any[] = [];
            for(const club of clubs)
                for(const meeting of club.meetings)
                {
                    if(meeting.date === today)
                        meet.push(club);
                    break;
                }
            return meet;
        })

        return NextResponse.json(clubsWithMeetingsToday);

    } catch (error) {
        return NextResponse.json(
            { error: "An error occurred while fetching today's meetings" },
            { status: 500 }
        );
    }

}

//if you wanted to see the old version code...
// const clubsWithMeetingsToday = clubs.filter(club => {
//     club.meetings.

//     // check frequencey, 1 = every 1 week, 2 = every 2 weeks, 3 = every 3 weeks
//     // ckeck start date
//     const startDate = new Date(club.startDate);
//     const frequency = club.Frequency;

//     // calculate the number of weeks between the start date and today
//     const weeksSinceStart = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7));

//     // check if the number of weeks since the start date is divisible by the frequency
//     if(!(weeksSinceStart % frequency === 0)) {
//         return false;
//     }

//     // check if the day of the week matches
//     const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
//     // convert club.weekdays = "Monday", "Tuesday", etc. to a number, for each weekday in the array
//     const clubWeekdays: number[] = club.Weekdays.map(weekday => {
//         switch (weekday.trim()) {
//             case "Sunday":
//                 return 0;
//             case "Monday":
//                 return 1;
//             case "Tuesday":
//                 return 2;
//             case "Wednesday":
//                 return 3;
//             case "Thursday":
//                 return 4;
//             case "Friday":
//                 return 5;
//             case "Saturday":
//                 return 6;
//             default:
//                 return -1; // Invalid weekday
//         }
//     });          
//     return clubWeekdays.includes(dayOfWeek);
// });
