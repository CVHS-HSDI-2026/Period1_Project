import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding test data...");

  const password = await bcrypt.hash("password123", 10);

  // Users + Students
  const alice = await prisma.user.create({
    data: {
      email: "alice@example.com",
      password,
      name: "Alice Johnson",
      student: { create: { graduationYear: 2027 } },
    },
    include: { student: true },
  });

  const bob = await prisma.user.create({
    data: {
      email: "bob@example.com",
      password,
      name: "Bob Smith",
      student: { create: { graduationYear: 2028 } },
    },
    include: { student: true },
  });

  const charlie = await prisma.user.create({
    data: {
      email: "charlie@example.com",
      password,
      name: "Charlie Davis",
      student: { create: { graduationYear: 2027 } },
    },
    include: { student: true },
  });

  console.log("Created test users: Alice, Bob, Charlie");

  // Clubs
  const robotics = await prisma.club.create({
    data: {
      name: "Robotics Club",
      description: "Build and program robots for competitions.",
      roomNumber: "204",
      photoUrl: "https://placehold.co/400x200",
      startDate: new Date("2026-01-13"),
      Frequency: 1,
      Weekdays: ["Monday", "Wednesday"],
      links: [],
      location: 1,
      tags: ["STEM", "Engineering"],
      teacherAdvisor: "Mr. Roberts",
      members: { connect: [{ id: alice.student!.id }, { id: bob.student!.id }] },
      officers: { connect: [{ id: alice.student!.id }] },
    },
  });

  const keyClub = await prisma.club.create({
    data: {
      name: "Key Club",
      description: "Community service and leadership organization.",
      roomNumber: "118",
      photoUrl: "https://placehold.co/400x200",
      startDate: new Date("2026-01-14"),
      Frequency: 2,
      Weekdays: ["Tuesday"],
      links: [],
      location: 2,
      tags: ["Service", "Leadership"],
      teacherAdvisor: "Ms. Chen",
      members: { connect: [{ id: alice.student!.id }, { id: charlie.student!.id }] },
      officers: { connect: [{ id: charlie.student!.id }] },
    },
  });

  const drama = await prisma.club.create({
    data: {
      name: "Drama Club",
      description: "Perform plays, improv, and stage productions.",
      roomNumber: "Auditorium",
      photoUrl: "https://placehold.co/400x200",
      startDate: new Date("2026-01-15"),
      Frequency: 1,
      Weekdays: ["Thursday", "Friday"],
      links: [],
      location: 3,
      tags: ["Arts", "Theater"],
      teacherAdvisor: "Mrs. Patel",
      members: { connect: [{ id: charlie.student!.id }] },
      officers: { connect: [{ id: charlie.student!.id }] },
    },
  });

  console.log("Created clubs: Robotics, Key Club, Drama");

  // Announcements
  await prisma.announcement.createMany({
    data: [
      { title: "Weekly Meeting Cancelled", content: "This week's meeting is cancelled due to the holiday.", images: [], clubId: robotics.id, posterId: alice.student!.id },
      { title: "Bake Sale Fundraiser", content: "Join us Friday for our annual bake sale! All proceeds go to competition fees.", images: [], clubId: keyClub.id, posterId: charlie.student!.id },
      { title: "New Members Welcome", content: "Open enrollment is here. Stop by to sign up!", images: [], clubId: drama.id, posterId: charlie.student!.id },
      { title: "Competition Results", content: "We placed 2nd at the regional robotics competition. Great job team!", images: [], clubId: robotics.id, posterId: alice.student!.id },
      { title: "Spring Play Auditions", content: "Auditions for the spring play will be held next Thursday and Friday after school.", images: [], clubId: drama.id, posterId: charlie.student!.id },
    ],
  });

  console.log("Created 5 announcements");
  console.log("\nTest seed complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
