import { ReactNode, createContext, useContext, useState } from "react";

//as we will be providing data to whole app, cwe've wrapped the whole <App> and passing it as a children(visit main.tsx)
export interface Props{
    children: ReactNode
}

//defining each object in todo array, to handle task with ease
export interface Todo{
    id:string;
    task:string;
    completed:boolean;
    createdAt: Date;
}

//Defining shape of context Data
export interface TodosContext{
    todos:Todo[];
    handleAddTodo: (task:string) => void; //call signature
    toggleTodoAsCompleted: (id:string) => void;
    handleDeleteTodo: (id:string)=>void;
}


//"createContext" like a store which will all the data
export const todosContext = createContext<TodosContext | null>(null)




/* this provide the asked data from the store to the components, as it wraps whole app now data
can be provided to any of its children components */
export const TodosProvider = ({children}:Props) => {
    const [todos, settodos] = useState<Todo[]>(()=>{
        try{
            const newTodo = localStorage.getItem("todos") || "[]"
            return JSON.parse(newTodo) as Todo[]
        }
        catch(error)
        {
            return []
        }
    })
    const handleAddTodo = (task:string)=>{
        settodos((prev) =>{
            const newTodos:Todo[] = [{
                id: Math.random().toString(),
                task:task,
                completed: false,
                createdAt: new Date()
            },
            ...prev
            ]

            localStorage.setItem("todos",JSON.stringify(newTodos));
            return newTodos
        })
    }

    //mark the toggle completed
    const toggleTodoAsCompleted = (id:string) => {
        settodos((prev) => {
        let newTodos = prev.map((todo) => {
            if(todo.id===id){
                return {...todo, completed:!todo.completed}
            }
            return todo;
        })
        localStorage.setItem("todos",JSON.stringify(newTodos));

        return newTodos
    })
}
const handleDeleteTodo = (id:string) => {
    settodos((prev) =>{
        let newTodos = prev.filter((filterTodo) => filterTodo.id !== id);
        localStorage.setItem("todos",JSON.stringify(newTodos));

        return newTodos
    })
}

    return <todosContext.Provider value={{todos,handleAddTodo, toggleTodoAsCompleted, handleDeleteTodo}}>
        {children}
    </todosContext.Provider>
}
// this will consume the data provide by provider from the store
export const useTodos = () => {
    const todosConsumer = useContext(todosContext);
    if(!todosConsumer){
        //This condiion is use to check if the App is wrapped or not, if this is thrown please check main.tsx.
        throw new Error("useTodos used outside of provider") 
    }
    return todosConsumer
}
