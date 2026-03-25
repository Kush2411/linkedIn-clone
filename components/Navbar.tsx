import Image from "next/image";
import logo from "../public/linkedin-logo.jpg";
import { SearchInput } from "./SearchInput";
import { NavItems } from "./NavItems";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export const Navbar = () => {
  return (
    <div className="fixed w-full bg-white z-50 shadow-sm">
      <div className="flex items-center max-w-6xl justify-between h-14 mx-auto px-3">
        <div className="flex items-center justify-center gap-2">
          <Image src={logo} alt="logo" width={35} height={35} />
          <div className="md:block hidden">
            <SearchInput />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="md:block hidden">
            <NavItems />
          </div>
          <div>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="secondary" className="rounded-full">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </div>
  );
};
