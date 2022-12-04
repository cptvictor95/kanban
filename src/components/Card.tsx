import React from "react";

export type Card = {
  id: string;
  title: string;
  description: string;
};

export const Card: React.FC<{ card: Card }> = ({ card }) => {
  return (
    <article className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:cursor-grab hover:bg-white/20">
      <h3 className="text-2xl font-bold">{card.title}</h3>
      <div className="text-lg">{card.description}</div>
    </article>
  );
};
