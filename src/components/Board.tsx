import React from "react";
import { trpc } from "../utils/trpc";
import Column from "./Column";

const Board = () => {
  const columns = trpc.column.getAll.useQuery();
  return (
    <section className="flex gap-4">
      {columns?.data &&
        columns.data.map((column) => {
          return <Column key={column.id} column={column} />;
        })}
    </section>
  );
};

export default Board;
