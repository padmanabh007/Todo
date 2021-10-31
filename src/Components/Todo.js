import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { context } from "./Login"

export default function Todo() {

    const [todos, setTodos] = useState([])
    const [data, setData] = useState({})

    const id = useContext(context)

    useEffect(() => {
        axios.get(`http://localhost:5000/todo/${id.id}`)
        .then(response => setTodos(response.data))
        .catch(error => console.log(error))
    }, [id])

    const onAddHandler = () =>{
        axios.post(`http://localhost:5000/addTodo/${id.id}`,data)
        .then(response => setTodos(response.data))
        .catch(error => console.log(error))
    }

    const onDeleteHandler = (key) =>{
        axios.delete(`http://localhost:5000/delTodo/${key}/${id.id}`,data)
        .then(response => setTodos(response.data))
        .catch(error => console.log(error))
    }

    return (
        <div>
            <label>Todo</label><br/>
            <input type="email" placeholder='Email' onChange={(e) => setData({work:e.target.value}) }/><br/>
            <button onClick ={()=> onAddHandler()}>Add</button>
            { todos.map((item, key) => <p>{item.work}<button onClick = {()=>onDeleteHandler(item.id)}>X</button></p>) }
        </div>
    )
}
