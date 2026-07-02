"use client";
import { FaPlus } from "react-icons/fa";
import Modal from "./Modal";
import { useState, type FormEventHandler } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import {v4 as uuidv4} from 'uuid';

export default function AddTask() {
  const router=useRouter();
  const [newTaskValue, setNewTaskValue] = useState<string>("");

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> =async (e) => {
    e.preventDefault();
    await addTodo({
        id:uuidv4(),
        text:newTaskValue
    })

    setModalOpen(false);
    setNewTaskValue("");
    router.refresh();
  };
  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full"
      >
        Add new task <FaPlus className="ml-2" size={12} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        modal for add todo
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">Add new task</h3>
          <div className="modal-action">
            <input
            value={newTaskValue}
            onChange={e=>setNewTaskValue(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
