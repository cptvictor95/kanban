import React from "react";
import { trpc } from "../utils/trpc";
import { Column } from "./Column";
import { Loading } from "./Loading";

export const Board = () => {
  const columns = trpc.column.getAll.useQuery();
  const loading =
    columns.isLoading || columns.isFetching || columns.isRefetching;
  return (
    <section className="flex gap-4">
      {loading ? (
        <Loading />
      ) : (
        columns?.data &&
        columns.data.map((column) => {
          return <Column key={column.id} column={column} />;
        })
      )}
    </section>
  );
};
