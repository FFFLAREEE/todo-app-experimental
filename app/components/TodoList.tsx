"use client";

import Task from "./Task";
import { useQuery } from "@tanstack/react-query";
import { getAllTodos } from "@/api";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TodoList=()=>{
  const{
    data: tasks=[],
    isPending,
    isError,
    error,
    
  }=useQuery(
    {
      queryKey:["tasks"],
      queryFn:getAllTodos,
    }
  );
  if(isPending){
    return <p> Loading tasks</p>;
  }

  if(isError ){
    return (
      <p>
        Failed to load tasks:{""}
        {error instanceof Error? error.message:"Unknown error"

        }
      </p>
    );
  }

  if(tasks.length===0){
    return <p>No tasks yet.</p>;
  }
return (
  <div className="rounded-md border">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>TASKS</TableHead>
        <TableHead className="text-right">ACTIONS</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </TableBody>
  </Table>
</div>


);

};



export default TodoList;