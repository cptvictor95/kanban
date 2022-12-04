import { type NextPage } from "next";

import Main from "../layouts/Main";
import { Header } from "../components/Header";
import { NewColumn } from "../components/NewColumn";

import { Board } from "../components/Board";

const Home: NextPage = () => {
  return (
    <Main>
      <Header />
      <div className="container flex h-full flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Kanban
        </h1>

        <Board />
        <NewColumn />
      </div>
    </Main>
  );
};

export default Home;
