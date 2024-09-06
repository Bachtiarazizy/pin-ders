"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { parseWithZod } from "@conform-to/zod";
import { pinSchema } from "@/lib/schemas";

export async function createPin(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: pinSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString: string) => urlString.split(",").map((url: string) => url.trim()));

  const board = await prisma.board.findFirst({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
    },
  });

  if (!board) {
    throw new Error("Board not found for the user");
  }

  // Explicitly typing tagConnections
  let tagConnections: {
    where: { name: string };
    create: { name: string };
  }[] = [];

  if (submission.value.tags && submission.value.tags.length > 0) {
    tagConnections = submission.value.tags.map((tag: { name: string }) => ({
      where: { name: tag.name }, // Assuming each tag has a name property
      create: { name: tag.name },
    }));
  }

  // Create the Pin and associate it with the user, board, and tags
  await prisma.pin.create({
    data: {
      title: submission.value.title,
      description: submission.value.description,
      images: flattenUrls,
      userId: user.id, // Required user ID
      boardId: board.id, // Associate with the found board
      tags: {
        connectOrCreate: tagConnections,
      },
    },
  });

  return redirect("/");
}

export async function editPin(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: pinSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) => urlString.split(",").map((url) => url.trim()));

  const board = await prisma.board.findFirst({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
    },
  });

  if (!board) {
    throw new Error("board not found for the user");
  }

  const pinId = formData.get("pinId") as string;
  const existingPin = await prisma.pin.findUnique({
    where: {
      id: pinId,
    },
  });

  if (!existingPin) {
    throw new Error("Pin not found");
  }

  await prisma.pin.update({
    where: {
      id: pinId,
    },
    data: {
      title: submission.value.title,
      description: submission.value.description,
      images: flattenUrls,
    },
  });

  redirect("/");
}

export async function deletePin(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const board = await prisma.board.findFirst({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
    },
  });

  if (!board) {
    throw new Error("board not found for the user");
  }

  const pinId = formData.get("pinId") as string;
  const existingPin = await prisma.pin.findUnique({
    where: {
      id: pinId,
    },
  });

  if (!existingPin) {
    throw new Error("Pin not found");
  }

  await prisma.pin.delete({
    where: {
      id: pinId,
    },
  });

  redirect("/");
}
