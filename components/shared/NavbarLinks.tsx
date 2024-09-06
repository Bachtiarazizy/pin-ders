"use client";

import { NavLinks } from "@/constant";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarLinks() {
  const location = usePathname();

  return (
    <div className="hidden md:flex  items-center col-span-6 gap-x-2">
      {NavLinks.map((item) => (
        <Link
          href={item.href}
          key={item.id}
          className={cn(location === item.href ? "text-primary bg-muted" : "transition duration-200 hover:text-primary hover:text-opacity-75", "group flex items-center px-4 py-2 font-medium rounded-full")}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
