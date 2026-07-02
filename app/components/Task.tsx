"use client";
import { ITask } from "@/types/tasks";
import {FaEdit } from "react-icons/fa";
import {FaTrash } from "react-icons/fa";
import React from "react";

import { useState, type FormEventHandler } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";
interface TaskProps{
    task:ITask
}
const Task: React.FC<TaskProps> =({task})=>{
    const router =useRouter();
    const [modalOpenEdit,setModalOpenEdit] =useState<boolean>(false);
    const [modalOpenDeleted,setModalOpenDeleted] =useState <boolean>(false);
    const [taskToEdit,setTaskToEdit]= useState<string>(task.text)
    const handleSubmitEditTodo : FormEventHandler<HTMLFormElement> =async (e) => {
        e.preventDefault();
        await editTodo(
            {
                id:task.id,
                text:taskToEdit

            }
        );
    
        setModalOpenEdit(false);
        router.refresh();
      };
    const handleDeleteTask = async(id:string)=>{
        await deleteTodo(id);
        setModalOpenDeleted(false);
        router.refresh()
    }


    return     (
    <tr key={task.id}>
    <td className='w-full'>{task.text}</td>
    <td className="flex gap-5">

    <FaEdit onClick={()=> setModalOpenEdit(true)} cursor="pointer"className="text-blue-500"size={25} />
    <Modal modalOpen={modalOpenEdit} setModalOpen={setModalOpenEdit}>
    modal for add todo
        <form onSubmit={handleSubmitEditTodo}>
          <h3 className="font-bold text-lg"> Edit task</h3>
          <div className="modal-action">
            <input
            value={taskToEdit}
            onChange={e=>setTaskToEdit(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    <FaTrash  onClick={()=>setModalOpenDeleted(true)}cursor="pointer" className="text-red-500" size ={25} />
    <Modal modalOpen={modalOpenDeleted} setModalOpen={setModalOpenDeleted}>
        <h3 className="text-lg">Are you sure you want to delete this task?</h3>
        <div className="modal-action">
            <button onClick={()=>handleDeleteTask(task.id)} className="btn">Yes</button>

        </div>
    </Modal>
    </td>
  </tr>
  );
};
export default Task;