import { signIn, signOut, useSession } from "next-auth/react";
import { IoArrowBack } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { useRouter } from "next/router";
import Image from "next/image";

export const Header: React.FC = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  return (
    <nav className="flex w-full flex-col items-center justify-between gap-2 px-8 py-4 md:flex-row">
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
      >
        {router.asPath === "/" ? (
          <>
            <FaHome />
            Home
          </>
        ) : (
          <>
            <IoArrowBack />
            Go back
          </>
        )}
      </button>

      <button
        className="flex items-center gap-4 rounded-full bg-white/10 px-8 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? (
          <>
            Sign out
            <Image
              className="rounded-full"
              width="32"
              height="32"
              src={sessionData.user?.image as string}
              alt={`${sessionData.user?.name}'s avatar`}
            />
          </>
        ) : (
          "Sign in"
        )}
      </button>
    </nav>
  );
};
