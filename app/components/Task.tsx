"use client";

import { ITask } from "@/types/tasks";
import { FaEdit, FaTrash } from "react-icons/fa";
import React, { useState, type FormEventHandler } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();

  const [modalOpenEdit, setModalOpenEdit] = useState<boolean>(false);
  const [modalOpenDeleted, setModalOpenDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await editTodo({
      id: task.id,
      text: taskToEdit,
    });

    setModalOpenEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setModalOpenDeleted(false);
    router.refresh();
  };

  return (
    <TableRow>
      <TableCell className="w-full">{task.text}</TableCell>

      <TableCell>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => setModalOpenEdit(true)}
          >
            <FaEdit className="text-blue-500" size={18} />
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => setModalOpenDeleted(true)}
          >
            <FaTrash className="text-red-500" size={18} />
          </Button>
        </div>

        <Modal modalOpen={modalOpenEdit} setModalOpen={setModalOpenEdit}>
          <form onSubmit={handleSubmitEditTodo} className="space-y-4">
            <h3 className="text-lg font-bold">Edit task</h3>

            <div className="flex gap-2">
              <Input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
              />

              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Modal>

        <Modal modalOpen={modalOpenDeleted} setModalOpen={setModalOpenDeleted}>
          <div className="space-y-4">
            <h3 className="text-lg">
              Are you sure you want to delete this task?
            </h3>

            <div className="flex justify-end">
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleDeleteTask(task.id)}
              >
                Yes
              </Button>
            </div>
          </div>
        </Modal>
      </TableCell>
    </TableRow>
  );
};

export default Task;