
import { ITask } from "@/types/tasks";

const baseUrl = "http://localhost:3002/tasks";

export const getAllTodos = async (): Promise<ITask[]> => {
  
  const res = await fetch(baseUrl,{cache:'no-store'});
  if(!res.ok){
    throw new Error("Failed to fetch todos");
  }
  return res.json();
};

export const addTodo =async(todo:ITask):Promise<ITask> =>{
    const res =await fetch(baseUrl,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(todo)
    });
    if (!res.ok) {
        throw new Error("Failed to add todo");
      }
    
      return res.json();
    


}

export const editTodo =async(todo:ITask):Promise<ITask> =>{
    const res =await fetch(`${baseUrl}/${todo.id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(todo)
    })
    if (!res.ok) {
        throw new Error("Failed to edit todo");
      }
    
      return res.json();
   


}


export const deleteTodo =async(id:string):Promise<void> =>{
   const res=await fetch(`${baseUrl}/${id}`,{
        method:'DELETE',
       
    });
    if (!res.ok) {
        throw new Error("Failed to delete todo");
      }


}