import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  images: string[];
  title: string;
  description: string;
  id: string;
}

export function Card({ images, id, title, description }: iAppProps) {
  // Destructure currency
  return (
    <div className="rounded-lg group relative block overflow-hidden shadow-md">
      <div>{images}</div>

      <div className="relative border p-6 bg-background ">
        <h3 className="text-lg font-medium text-primary">{title}</h3>
        <div className="mt-2 flex flex-row items-center justify-between">
          <p className="text-lg font-medium text-primary">{description}</p>
        </div>

        <Button asChild className="flex mt-2 items-center justify-center w-full rounded  text-sm font-medium transition hover:scale-105">
          <Link href={`/pins/${id}`}>Learn More!</Link>
        </Button>
      </div>
    </div>
  );
}

export function LoadingProductCard() {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-full h-[230px]" />
      <div className="flex flex-col mt-2 gap-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="w-full h-6" />
      </div>

      <Skeleton className="w-full h-10 mt-5" />
    </div>
  );
}
