import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header
      className="bg-white px-5 py-3 shadow-sm font-work-sans"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backdropFilter: "blur(6px)",
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        background: "rgba(255, 255, 255, 0.9)",
        transition: "backdrop-filter 0.2s ease-in-out",
      }}
    >
      <nav className="flex justify-between items-center ">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>
        <div className="flex items-center gap-5 text-black  font-work-sans ">
          {session && session.user ? (
            <>
              <Link href={"/startup/create"}>
                <span
                  className="
                    cursor-pointer
                    hover:bg-primary-100 
                    hover:text-white
                    transition-all
                    duration-200
                    px-4 py-2 rounded-lg
                    max-sm:hidden
                "
                >
                  Create
                </span>
                <BadgePlus className="sm:hidden size-6 text-primary" />
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span
                    className="  cursor-pointer
                    hover:bg-primary-100 
                    hover:text-white
                    transition-all
                    duration-200
                    px-4 py-2 rounded-lg
                    max-sm:hidden"
                  >
                    Logout
                  </span>
                  <LogOut className="sm:hidden size-6 text-red-600" />
                </button>
              </form>

              <Link href={`user/${session?.user?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image}
                    alt={session?.user?.name}
                  />
                  <AvatarFallback>{session?.user?.name[0]}</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <>
              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <button
                  type="submit"
                  className="
                    cursor-pointer
                    hover:bg-primary-100 
                    hover:text-white
                    transition-all
                    duration-200
                    px-4 py-2 rounded-lg
                "
                >
                  <span>Sign In</span>
                </button>
              </form>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
