import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { trpc } from "../utils/trpc";

export type Card = {
  id: string;
  title: string;
  description: string;
};

export const Card: React.FC<{ card: Card }> = ({ card }) => {
  const { mutateAsync } = trpc.card.delete.useMutation();
  const onDelete = (cardId: string) => {
    mutateAsync({
      cardId,
    });
  };

  return (
    <article className="flex w-full flex-col gap-4 rounded-xl bg-white/10 p-4 hover:cursor-grab hover:bg-white/20">
      <header className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold text-white">{card.title}</h3>
        <div className="dropdown dropdown-top dropdown-end">
          <label
            tabIndex={0}
            className="btn-ghost btn-square btn-sm btn hover:cursor-pointer"
          >
            <HiDotsVertical />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box w-32 bg-base-100 p-2 shadow"
          >
            <li onClick={() => onDelete(card.id)}>
              <a>Delete</a>
            </li>
          </ul>
        </div>
      </header>
      <div className="text-white">
        <h3 className="text-lg font-medium ">Description</h3>
        <p>{card.description}</p>
      </div>
    </article>
  );
};
