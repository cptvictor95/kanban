import React from "react";
import { trpc } from "../utils/trpc";
import { Card } from "./Card";
import { NewCard } from "./NewCard";

export interface Column {
  id: string;
  title: string;
  cards?: Card[];
}

const Column: React.FC<{ column: Column }> = ({ column }) => {
  const cards = trpc.card.getByColumn.useQuery({ columnId: column.id });
  console.log("CARDS", cards.data);
  return (
    <>
      <section className="flex flex-col items-center gap-2 rounded-md bg-gradient-to-b from-[#4d0235] to-[#32122e] px-2 py-4 md:gap-2">
        <header className="flex items-center justify-between gap-4">
          <h2 className="text-bold text-xl text-white">{column.title}</h2>
          <p className="text-bold text-md text-white">
            {cards?.data?.length} issues
          </p>
        </header>
        {cards?.data?.map((card) => (
          <Card key={card.id} card={card} />
        ))}
        <NewCard columnId={column.id} />
      </section>
    </>
  );
};

export default Column;