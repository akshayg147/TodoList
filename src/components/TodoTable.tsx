import { useContext } from "react"
import { useTodos } from "../store/todos";
import { useSearchParams } from "react-router-dom";

function Todos(){
    const {todos, toggleTodoAsCompleted, handleDeleteTodo} = useTodos();
    const [searchparams] = useSearchParams();
    let todoData  = searchparams.get("todos")
    let filterData = todos;
    if(todoData == "active"){
        filterData = filterData.filter((task) => !task.completed)
    }
    if(todoData == "completed"){
        filterData = filterData.filter((task) => task.completed)
    }

    return (
        <ul className="main-task">
            {
                filterData.map((todo) => {
                    return <li key={todo.id}>
                        <input type="checkbox" id={`todo-${todo.id}`} 
                        checked={todo.completed} onChange={()=> toggleTodoAsCompleted(todo.id)}/>
                        <label htmlFor="">{todo.task}</label>
                        {
                        todo.completed && 
                        <button type="button" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    }
                    </li>
                    
                })
            }
        </ul>

    )
}

export default Todos