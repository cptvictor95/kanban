import { signIn, signOut, useSession } from "next-auth/react";
import { IoArrowBack } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { useRouter } from "next/router";
import Image from "next/image";

export const Header: React.FC = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  return (
    <nav className="flex h-20 w-full items-center justify-between px-8">
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

      <p className="flex items-center gap-2 text-center text-xl text-white">
        {sessionData && (
          <>
            {sessionData.user?.name}
            <Image
              className="rounded-full"
              width="40"
              height="40"
              src={sessionData.user?.image as string}
              alt={`${sessionData.user?.name}'s avatar`}
            />
          </>
        )}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </nav>
  );
};
