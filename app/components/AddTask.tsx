import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default function AddTask() {
  return (
    <Link href="/add-task" className="btn btn-primary w-full">
      Add Task <FaPlus className="ml-2" size={12} />
    </Link>
  );
}