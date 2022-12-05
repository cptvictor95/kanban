import { type QueryClient } from "@tanstack/react-query";
import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { trpc } from "../utils/trpc";

export type Card = {
  id: string;
  title: string;
  description: string;
  columnId: string;
};

const updateCache = ({ client, data }: { client: QueryClient; data: Card }) => {
  client.setQueryData(
    [
      ["card", "getByColumn"],
      { input: { columnId: data.columnId }, type: "query" },
    ],
    (oldData) => {
      const newData = oldData as Card[];

      return newData.filter((card) => card.id !== data.id);
    }
  );
};

export const Card: React.FC<{ card: Card; client: QueryClient }> = ({
  card,
  client,
}) => {
  const { mutateAsync } = trpc.card.delete.useMutation({
    onSuccess: (data) => {
      updateCache({ client, data });
    },
  });

  const onDelete = (cardId: string) => {
    mutateAsync({
      cardId,
    });
  };

  return (
    <article className="flex min-w-full flex-col gap-4 rounded-xl bg-white/10 p-4 hover:cursor-grab hover:bg-white/20">
      <header className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold text-white">{card.title}</h3>
        <div className="dropdown-top dropdown-end dropdown">
          <label
            tabIndex={0}
            className="btn-ghost btn-square btn-sm btn hover:cursor-pointer"
          >
            <HiDotsVertical />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box w-32 bg-gradient-to-b from-[#32122e] to-[#32122e] p-2 shadow"
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
