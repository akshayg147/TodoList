import { Link, useSearchParams } from "react-router-dom"

function Navbar() {
    const [searchparams] = useSearchParams();
    let todoData  = searchparams.get("todos")
    return (
        <nav>
            <Link to="/" className={todoData==null ? "active":""}>All</Link>
            <Link to="/?todos=active" className={todoData=="active" ? "active":""}>Active</Link>
            <Link to="/?todos=completed" className={todoData=="completed" ? "active":""}>Completed</Link>
        </nav>
    )
}

export default Navbar