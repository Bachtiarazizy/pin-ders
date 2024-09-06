import Link from "next/link";
import { Button } from "@/components/ui/button";

// import { ModeToggle } from "../provider/ModeToggle";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Bell, MessageCircleMore, Search, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import SearchBar from "./SearchBar";
import NavbarLinks from "./NavbarLinks";
import UserNav from "./UserNav";

export default async function Header() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className=" w-full flex items-center justify-between py-5 px-4 lg:px-24 sticky top-0 z-50 bg-background  ">
      <div className="">
        <a href="/" className="text-3xl font-bold text-black">
          Pin<span className="text-primary">Ders</span>
        </a>
      </div>
      <div className="">
        <NavbarLinks />
      </div>

      <div className="relative">
        {/* <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        <Input className="w-[900px] pl-10 rounded-full py-7 bg-muted border-none" placeholder="Search..." /> */}
        <SearchBar />
      </div>

      <div className="flex items-center gap-x-4">
        <Bell className="h-14 w-14 hover:bg-muted p-3 rounded-full transition-all" />
        <MessageCircleMore className="h-14 w-14 hover:bg-muted p-3 rounded-full transition-all" />
        {user ? (
          <UserNav email={user.email as string} firstName={user.given_name as string} lastName={user.given_name as string} userImage={user.picture ?? `https://avatar.vercel.sh/${user.given_name}`} />
        ) : (
          <div className="hidden md:flex items-center gap-x-2">
            <Button asChild>
              <LoginLink>Login</LoginLink>
            </Button>
            <Button variant="secondary" asChild>
              <RegisterLink>Register</RegisterLink>
            </Button>
          </div>
        )}

        <div className="md:hidden">{/* <MobileMenu /> */}</div>
      </div>
    </nav>
  );
}
