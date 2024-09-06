import React from "react";
import { notFound } from "next/navigation";
import { getBoardData } from "@/actions/board-action";
import { Card } from "@/components/shared/Card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PinForm from "@/components/shared/form/Pin-form";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const boardData = await getBoardData(params.id);
  return {
    title: boardData.name,
  };
}

export default async function BoardIdPage({ params }: { params: { id: string } }) {
  const boardData = await getBoardData(params.id).catch(() => notFound());

  if (!boardData) {
    return notFound();
  }

  return (
    <div className="py-8 px-4 md:px-32">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight ">{boardData.name}</h1>
        <p className="mt-2 ">{boardData.description}</p>
        <p className="mt-2 ">
          <strong>Owner:</strong> {boardData.user ? `${boardData.user.firstName} ${boardData.user.lastName}` : "Unknown"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start border-t border-gray-200 mt-10 py-10">
        {boardData.pins.length > 0 ? (
          boardData.pins.map((pin) => <Card key={pin.id} images={pin.images} id={pin.id} title={pin.title} description={pin.description} />)
        ) : (
          <div className="col-span-full">
            <p className="text-center text-gray-500">No pin created yet</p>
          </div>
        )}
      </div>
      <Dialog>
        <DialogTrigger className="text-blue-500 underline">Create Pin</DialogTrigger>
        <DialogContent className="max-w-3xl w-full mx-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Pin</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
