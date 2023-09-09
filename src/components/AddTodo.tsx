import { FormEvent, useState } from "react"
import { useTodos } from "../store/todos";
 
 function AddToDo(){
    const [todo, settodo] = useState("")
    const {handleAddTodo} = useTodos();
    const handleformSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleAddTodo(todo)
        settodo("")
    }
    return (
        <form onSubmit={handleformSubmit}>
            <input type="text" name="task" value={todo} onChange={(e) => settodo(e.target.value)} />
            <button type="submit">Add</button>
        </form>
    )
 }

 export default AddToDo