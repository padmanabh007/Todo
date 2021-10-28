import axios from "axios"
import { useEffect, useState } from "react"

export default function Todo() {

    const [todos, setTodos] = useState([])
    const [data, setData] = useState({})

    useEffect(() => {
        axios.get('http://localhost:5000/todo')
        .then(response => setTodos(response.data))
        .catch(error => console.log(error))
    }, [])

    const onAddHandler = () =>{
        axios.post('http://localhost:5000/addTodo',data)
        .then(response => setTodos(response.data))
        .catch(error => console.log(error))
    }

    const onDeleteHandler = (key) =>{
        axios.delete(`http://localhost:5000/delTodo/${key}`,data)
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