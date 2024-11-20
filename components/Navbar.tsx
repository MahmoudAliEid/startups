import { auth, signOut, signIn } from "@/auth";
import Image from "next/image";
import Link from "next/link";

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
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>
        <div className="flex items-center gap-5 text-black font-bold">
          {session && session.user ? (
            <>
              <Link href={"/startup/create"}>
                <span>Create</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span>Log Out</span>
                </button>
              </form>
              <div>
                <Image
                  src={session.user.image || "/default-user.png"}
                  alt="user"
                  width={38}
                  height={38}
                  className="avatar"
                />
              </div>
              <Link href={`user/${session?.user?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <>
              <form
                action={async () => {
                  "use server"; // Server action to handle sign-in.
                  await signIn("github");
                }}
              >
                <button type="submit">
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
