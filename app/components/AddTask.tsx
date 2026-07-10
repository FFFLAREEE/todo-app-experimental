import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { buttonVariants } from "@/components/ui/button";

export default function AddTask() {
  return (
    <Link href="/add-task" className={buttonVariants({ className: "w-full" })}>
      Add Task <FaPlus className="ml-2" size={12} />
    </Link>
  );
}
