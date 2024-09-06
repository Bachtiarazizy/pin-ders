import prisma from "@/lib/db";
import React from "react";
import { unstable_noStore } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import BoardForm from "@/components/shared/form/Board-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      id: true,
      boards: {
        select: {
          id: true,
          name: true,
          description: true,
          isPrivate: true,
        },
      },
    },
  });

  return data;
}

export default async function Board() {
  unstable_noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  const userData = await getData(user.id);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Render User's Boards */}

      <section className="w-full max-w-2xl mb-8">
        <h2 className="text-2xl font-bold mb-4">Your Boards</h2>
        <div className="space-y-4">
          {userData?.boards.length ? (
            userData.boards.map((board) => (
              <Link key={board.id} href={`/board/${board.id}`} passHref>
                <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100">
                  <h3 className="text-xl font-semibold">{board.name}</h3>
                  <p className="text-gray-700">{board.description}</p>
                  <span className={`inline-block mt-2 text-sm ${board.isPrivate ? "text-red-500" : "text-green-500"}`}>{board.isPrivate ? "Private" : "Public"}</span>
                </div>
              </Link>
            ))
          ) : (
            <p>You haven&apos;t created any boards yet.</p>
          )}
        </div>
      </section>

      {/* Create Board Dialog */}
      <Dialog>
        <DialogTrigger className="text-blue-500 underline">Create Board</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create A Board</DialogTitle>
            <BoardForm />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
}
