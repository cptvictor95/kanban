/* eslint-disable react-hooks/exhaustive-deps */
import { type QueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { trpc } from "../utils/trpc";
import type { Column } from "./Column";

export interface ColumnDTO {
  title: string;
  userId: string;
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

    return [...newData, data];
  });
};

export const NewColumn: React.FC<{ client: QueryClient }> = ({ client }) => {
  const { mutateAsync } = trpc.column.create.useMutation({
    onSuccess: (data) => {
      updateCache({ client, data });
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<ColumnDTO>({
    mode: "onChange",
    defaultValues: {
      title: "",
    },
  });

  const onSubmitColumn = async (data: ColumnDTO) => {
    mutateAsync({
      title: data.title,
      cards: [],
    });
    reset();
    setIsOpen(false);
  };

  return (
    <>
      {isOpen ? (
        <form
          className="grid grid-cols-1 gap-2 rounded-md bg-gradient-to-b from-[#4d0235] to-[#32122e] px-2 py-4 md:gap-2"
          onSubmit={handleSubmit(onSubmitColumn)}
        >
          <button
            type="button"
            className="place-self-end text-xl text-white"
            onClick={() => setIsOpen(false)}
          >
            <IoClose />
          </button>
          <input
            type="text"
            placeholder="Card title"
            className="rounded-md bg-transparent p-2 text-white"
            {...register("title", { required: "Type something" })}
          />
          <button type="submit" className="h-0 opacity-0">
            create
          </button>
        </form>
      ) : (
        <button
          type="button"
          className="rounded-full bg-white/10 p-4 text-white hover:bg-white/20"
          onClick={() => setIsOpen(!isOpen)}
        >
          New column
        </button>
      )}
    </>
  );
};
