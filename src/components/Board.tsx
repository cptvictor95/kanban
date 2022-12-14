import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { trpc } from "../utils/trpc";
import { Column } from "./Column";
import { Loading } from "./Loading";
import { NewColumn } from "./NewColumn";

export const Board: React.FC = () => {
  const client = useQueryClient();
  const columns = trpc.column.getAll.useQuery();
  const loading =
    !columns.isPreviousData && (columns.isFetching || columns.isRefetching);

  return (
    <section className="flex w-full gap-4 overflow-x-auto">
      {loading ? (
        <Loading />
      ) : columns?.data && columns?.data.length == 0 ? (
        <p className="text-white">You haven&apos;t created any columns yet.</p>
      ) : (
        columns?.data?.map((column: Column) => {
          return <Column key={column.id} column={column} />;
        })
      )}
      <NewColumn client={client} />
    </section>
  );
};
