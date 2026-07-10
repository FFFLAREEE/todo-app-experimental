"use client";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addTodo } from "@/api";
import { v4 as uuidv4 } from "uuid";
import { Button, buttonVariants } from "@/components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";

type AddTaskFormValues = {
  text: string;
};

export default function AddTaskPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddTaskFormValues>({
    defaultValues: {
      text: "",
    },
  });

  const handleSubmitNewTodo: SubmitHandler<AddTaskFormValues> = async (data) => {
    const text = data.text.trim();

    await addTodo({
      id: uuidv4(),
      text,
    });

    reset();

    router.push("/");
    router.refresh();
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

        <div className="flex justify-end gap-3">
          <Link href="/" className={buttonVariants({ variant: "ghost" })}>
            Cancel
          </Link>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </main>
  );
}