import { type NextPage } from "next";
import Link from "next/link";

import { trpc } from "../utils/trpc";
import Main from "../layouts/Main";
import Header from "../components/Header";

const Home: NextPage = () => {
  const userById = trpc.user.getById.useQuery({
    id: "clb886awm0000vt5g8rhh98ra",
  });
  const users = trpc.user.getAll.useQuery();
  const cards = trpc.card.getAll.useQuery();

  console.log("USER BY ID", userById.data);
  console.log("USERS", users.data);
  console.log("CARDS", cards.data);

  return (
    <Main>
      <Header />
      <div className="container flex h-full flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Kanban
        </h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          {cards.data?.map((card) => {
            return (
              <article
                key={card.id}
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:cursor-grab hover:bg-white/20"
              >
                <h3 className="text-2xl font-bold">{card.title}</h3>
                <div className="text-lg">{card.content}</div>
              </article>
            );
          })}
        </div>
      </div>
    </Main>
  );
};

export default Home;
