import { type NextPage } from "next";

import { trpc } from "../utils/trpc";
import Main from "../layouts/Main";
import { Header } from "../components/Header";
import { Card } from "../components/Card";
import { NewCard } from "../components/NewCard";

const Home: NextPage = () => {
  const cards = trpc.card.getAll.useQuery();

  return (
    <Main>
      <Header />
      <div className="container flex h-full flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Kanban
        </h1>

        <NewCard />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          {cards.data?.map((card) => {
            console.log("CARD", card);
            return <Card key={card.id} card={card} />;
          })}
        </div>
      </div>
    </Main>
  );
};

export default Home;
