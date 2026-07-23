"use client";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { addTodo } from "@/api";
import { v4 as uuidv4 } from "uuid";
import { Button, buttonVariants } from "@/components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";

type AddTaskFormValues = {
  text: string;
  description: string
};

export default function AddTaskPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddTaskFormValues>({
    defaultValues: {
      text: "",
      description: "",
    },
  });
  
  const addTaskMutation =useMutation(
    {
      mutationFn:addTodo,
      onSuccess:async()=>{
        await queryClient.invalidateQueries({
          queryKey:["tasks"],
        });
        reset();
        router.push("/")
      }
    }
  )



  const handleSubmitNewTodo: SubmitHandler<AddTaskFormValues> = async (data) => {
    const text = data.text.trim();
    const description = data.description.trim();

    addTaskMutation.mutate({
      id: uuidv4(),
      text,
      description,
    });

  };

  return (
    <main className="max-w-md mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">Add new task</h1>

      <form onSubmit={handleSubmit(handleSubmitNewTodo)} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Type here"
            {...register("text", {
              validate: (value) =>
                value.trim().length > 0 || "Task cannot be empty",
            })}
          />

          {errors.text && (
            <p className="mt-1 text-sm text-red-500">
              {errors.text.message}
            </p>
          )}
        </div>
        <Textarea
          placeholder="Add a description"
          {...register("description")}
        />
        {addTaskMutation.isError && (
          <p className="text-sm text-red-500">
            Failed to add task:{" "}
            {addTaskMutation.error instanceof Error
              ? addTaskMutation.error.message
              : "Unknown error"}
          </p>
        )}


        <div className="flex justify-end gap-3">
          <Link href="/" className={buttonVariants({ variant: "ghost" })}>
            Cancel
          </Link>

          <Button type="submit" disabled={addTaskMutation.isPending}>
            {addTaskMutation.isPending? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </main>
  );
}