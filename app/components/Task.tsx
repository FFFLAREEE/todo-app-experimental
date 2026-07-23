"use client";

import type { ITask } from "@/types/tasks";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState, type FormEventHandler } from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import Modal from "./Modal";
import { deleteTodo, editTodo } from "@/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TableCell, TableRow } from "@/components/ui/table";

interface TaskProps {
  task: ITask;
}

const Task = ({ task }: TaskProps) => {
  const queryClient = useQueryClient();

  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [modalOpenDeleted, setModalOpenDeleted] = useState(false);

  const [taskToEdit, setTaskToEdit] = useState(task.text);
  const [descriptionToEdit, setDescriptionToEdit] = useState(
    task.description
  );

  const editTaskMutation = useMutation({
    mutationFn: editTodo,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      setModalOpenEdit(false);
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTodo,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      setModalOpenDeleted(false);
    },
  });

  const handleOpenEditModal = () => {
    setTaskToEdit(task.text);
    setDescriptionToEdit(task.description);
    setModalOpenEdit(true);
  };

  const handleSubmitEditTodo: FormEventHandler<
    HTMLFormElement
  > = (e) => {
    e.preventDefault();

    const text = taskToEdit.trim();
    const description = descriptionToEdit.trim();

    if (!text) {
      return;
    }

    editTaskMutation.mutate({
      id: task.id,
      text,
      description,
    });
  };

  const handleDeleteTask = () => {
    deleteTaskMutation.mutate(task.id);
  };

  return (
    <TableRow>
      <TableCell className="w-full">
        <div>
          <p className="font-medium">{task.text}</p>

          {task.description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {task.description}
            </p>
          )}
        </div>
      </TableCell>

      <TableCell>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={handleOpenEditModal}
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

        <Modal
          modalOpen={modalOpenEdit}
          setModalOpen={setModalOpenEdit}
        >
          <form
            onSubmit={handleSubmitEditTodo}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold">Edit task</h3>

            <Input
              value={taskToEdit}
              onChange={(e) =>
                setTaskToEdit(e.target.value)
              }
              type="text"
              placeholder="Type here"
            />

            <Textarea
              value={descriptionToEdit}
              onChange={(e) =>
                setDescriptionToEdit(e.target.value)
              }
              placeholder="Task Description"
            />

            {editTaskMutation.isError && (
              <p className="text-sm text-red-500">
                Failed to edit task:{" "}
                {editTaskMutation.error instanceof Error
                  ? editTaskMutation.error.message
                  : "Unknown error"}
              </p>
            )}

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={editTaskMutation.isPending}
              >
                {editTaskMutation.isPending
                  ? "Saving..."
                  : "Submit"}
              </Button>
            </div>
          </form>
        </Modal>

        <Modal
          modalOpen={modalOpenDeleted}
          setModalOpen={setModalOpenDeleted}
        >
          <div className="space-y-4">
            <h3 className="text-lg">
              Are you sure you want to delete this task?
            </h3>

            {deleteTaskMutation.isError && (
              <p className="text-sm text-red-500">
                Failed to delete task:{" "}
                {deleteTaskMutation.error instanceof Error
                  ? deleteTaskMutation.error.message
                  : "Unknown error"}
              </p>
            )}

            <div className="flex justify-end">
              <Button
                type="button"
                variant="destructive"
                disabled={deleteTaskMutation.isPending}
                onClick={handleDeleteTask}
              >
                {deleteTaskMutation.isPending
                  ? "Deleting..."
                  : "Yes"}
              </Button>
            </div>
          </div>
        </Modal>
      </TableCell>
    </TableRow>
  );
};

export default Task;