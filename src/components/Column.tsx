import { type QueryClient, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { trpc } from "../utils/trpc";
import { Card } from "./Card";
import { Loading } from "./Loading";
import { NewCard } from "./NewCard";

export interface Column {
  id: string;
  title: string;
  cards?: Card[];
}

const updateCache = ({
  client,
  data,
}: {
  client: QueryClient;
  data: Column;
}) => {
  client.setQueryData([["column", "getAll"], { type: "query" }], (oldData) => {
    const newData = oldData as Column[];

    return newData.filter((column) => column.id !== data.id);
  });
};

export const Column: React.FC<{ column: Column }> = ({ column }) => {
  const client = useQueryClient();
  const cards = trpc.card.getByColumn.useQuery({ columnId: column.id });
  const loading =
    !cards.isPreviousData && (cards.isFetching || cards.isLoading);
  const { mutateAsync: mutateAsyncColumn } = trpc.column.delete.useMutation({
    onSuccess: (data) => {
      updateCache({ client, data });
    },
  });

  const onDelete = (columnId: string) => {
    mutateAsyncColumn({
      columnId,
    });
  };

  return (
    <section className="flex h-fit min-w-fit flex-col items-center gap-2 rounded-md bg-gradient-to-b from-[#4d0235] to-[#32122e] px-2 py-4 md:gap-2">
      <header className="flex items-center justify-between gap-4 pb-2">
        <h2 className="text-bold min-w-fit text-lg uppercase text-white">
          {column.title}
        </h2>

        <div className="flex items-center">
          <p className="text-bold text-md min-w-fit text-white">
            {cards?.data?.length == 0
              ? ""
              : cards?.data?.length == 1
              ? `${cards?.data?.length} issue`
              : `${cards?.data?.length} issues`}
          </p>
          <div className="dropdown-top dropdown-end dropdown">
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
              <li onClick={() => onDelete(column.id)}>
                <a>Delete</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
      {loading ? (
        <Loading />
      ) : (
        cards?.data?.map((card) => (
          <Card key={card.id} card={card} client={client} />
        ))
      )}
      <NewCard columnId={column.id} client={client} />
    </section>
  );
};
