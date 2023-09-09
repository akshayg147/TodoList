import AddToDo from "./components/AddTodo"
import Todos from "./components/TodoTable"
import Navbar from "./components/navbar"
import "./App.css"
function App(){
  return (
    <main>
      <h1>Todo App</h1>
      <Navbar></Navbar>
      <AddToDo></AddToDo>
      <Todos></Todos>
    </main>
  )
}

export default App