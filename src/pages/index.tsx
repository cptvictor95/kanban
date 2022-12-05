/* eslint-disable react-hooks/exhaustive-deps */
import { type NextPage } from "next";

import Main from "../layouts/Main";
import { Header } from "../components/Header";
import { NewColumn } from "../components/NewColumn";

import { Board } from "../components/Board";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const client = useQueryClient();
  const { data: sessionData } = useSession();

  return (
    <Main>
      <Header />
      <div className="container flex h-full flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Kanban
        </h1>
        {sessionData ? (
          <>
            <Board />
            <NewColumn client={client} />
          </>
        ) : (
          <>
            <p className="text-white">Sign in to start using the kanban.</p>
          </>
        )}
      </div>
    </Main>
  );
};

export default Home;
