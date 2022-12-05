import { type QueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { trpc } from "../utils/trpc";
import { type Card } from "./Card";

export interface CardDTO {
  title: string;
  description: string;
  userId: string;
}

const updateCache = ({ client, data }: { client: QueryClient; data: Card }) => {
  client.setQueryData(
    [
      ["card", "getByColumn"],
      { input: { columnId: data.columnId }, type: "query" },
    ],
    (oldData) => {
      const newData = oldData as Card[];

      return [...newData, data];
    }
  );
};

export const NewCard: React.FC<{ columnId: string; client: QueryClient }> = ({
  columnId,
  client,
}) => {
  const { mutateAsync } = trpc.card.create.useMutation({
    onSuccess: (data) => {
      updateCache({ client, data });
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<CardDTO>({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmitCard = (data: CardDTO) => {
    mutateAsync({
      title: data.title,
      description: data.title,
      columnId: columnId,
    });
    reset();
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="w-max rounded-full bg-white/10 p-4 text-white hover:bg-white/20"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaPlus />
      </button>

      {isOpen && (
        <form
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:cursor-grab hover:bg-white/20"
          onSubmit={handleSubmit(onSubmitCard)}
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
            className="rounded-md bg-transparent p-2"
            {...register("title", { required: "Type something" })}
          />
          <input
            type="text"
            placeholder="Card description"
            className="rounded-md bg-transparent p-2"
            {...register("description", { required: "Type something" })}
          />
          <button type="submit" className="sm:opacity-100 md:h-0 md:opacity-0">
            create
          </button>
        </form>
      )}
    </>
  );
};
