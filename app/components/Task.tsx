"use client";

import { ITask } from "@/types/tasks";
import { FaEdit, FaTrash } from "react-icons/fa";
import React, { useState, type FormEventHandler } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TableCell, TableRow } from "@/components/ui/table";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();

  const [modalOpenEdit, setModalOpenEdit] = useState<boolean>(false);
  const [modalOpenDeleted, setModalOpenDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
  const [descriptionToEdit,setDescriptionToEdit]=useState<string>(task.description);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const text = taskToEdit.trim();
    const description =descriptionToEdit.trim();
    if(!text){
      return;
    }

    await editTodo({
      id: task.id,
      text,
      description,
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

            
              <Input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
              />
              <Textarea
              value={descriptionToEdit}
              onChange={(e)=>setDescriptionToEdit(e.target.value)}
              placeholder="Task Description"
              />
              <div className="flex justify-end">

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