"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { boardSchema } from "../lib/schemas";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export async function createBoard(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: boardSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.board.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      isPrivate: submission.value.isPrivate,
      userId: user.id,
    },
  });

  redirect("/create");
}

export async function getBoardData(boardId: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const data = await prisma.board.findUnique({
    where: {
      id: boardId,
    },
    select: {
      name: true,
      description: true,
      isPrivate: true,
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      pins: {
        select: {
          id: true,
          title: true,
          description: true,
          images: true,
        },
      },
    },
  });

  if (!data) {
    throw new Error("board not found");
  }

  return data;
}
