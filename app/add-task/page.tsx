"use client";

import { useState, type FormEventHandler } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addTodo } from "@/api";
import { v4 as uuidv4 } from "uuid";

export default function AddTaskPage() {
  const router = useRouter();
  const [newTaskValue, setNewTaskValue] = useState<string>("");

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const text = newTaskValue.trim();

    if (!text) {
      return;
    }

    await addTodo({
      id: uuidv4(),
      text,
    });

    setNewTaskValue("");

    router.push("/");
    router.refresh();
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">Add new task</h1>

      <form onSubmit={handleSubmitNewTodo} className="space-y-4">
        <input
          value={newTaskValue}
          onChange={(e) => setNewTaskValue(e.target.value)}
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
        />

        <div className="flex justify-end gap-3">
          <Link href="/" className="btn btn-ghost">
            Cancel
          </Link>

          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </main>
  );
}