import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { trpc } from "../utils/trpc";

export interface ColumnDTO {
  title: string;
  userId: string;
}

export const NewColumn: React.FC = () => {
  const { mutateAsync } = trpc.column.create.useMutation();
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<ColumnDTO>({
    mode: "onSubmit",
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
          className="rounded-full bg-white/10 p-4 text-white hover:bg-white/20"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaPlus /> new column
        </button>
      )}
    </>
  );
};
