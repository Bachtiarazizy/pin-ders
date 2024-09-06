import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ error: "Invalid search query" }, { status: 400 });
  }

  try {
    const pins = await prisma.pin.findMany({
      where: {
        OR: [{ title: { contains: q, mode: "insensitive" } }, { description: { contains: q, mode: "insensitive" } }],
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        // tags: true,
      },
      take: 10,
    });

    const boards = await prisma.board.findMany({
      where: {
        OR: [{ name: { contains: q, mode: "insensitive" } }, { description: { contains: q, mode: "insensitive" } }],
        isPrivate: false, // Only search public boards
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      take: 10,
    });

    const users = await prisma.user.findMany({
      where: {
        OR: [{ firstName: { contains: q, mode: "insensitive" } }, { lastName: { contains: q, mode: "insensitive" } }],
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        profileImage: true,
      },
      take: 10,
    });

    const tags = await prisma.tag.findMany({
      where: {
        name: { contains: q, mode: "insensitive" },
      },
      take: 10,
    });

    return NextResponse.json({ pins, boards, users, tags });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "An error occurred while searching" }, { status: 500 });
  }
}
