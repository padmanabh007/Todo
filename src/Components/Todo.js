import axios from "axios"
import { useEffect, useState } from "react"

export default function Todo(props) {

    const [todos, setTodos] = useState([])
    const [data, setData] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:5000/${props.id}/todo/`)
        .then(response => setTodos(response.data))
        .catch(error => console.log(error))
    }, [props.id])

    const onAddHandler = () =>{
        axios.post(`http://localhost:5000/${props.id}/addTodo/`,data)
        .then(response => setTodos(response.data))
        .catch(error => console.log(error))
    }
//
    const onDeleteHandler = (key) =>{
        axios.delete(`http://localhost:5000/${props.id}/delTodo/${key}/`,data)
        .then(response => setTodos(response.data))
        .catch(error => console.log(error))
    }

    return (
        <div>
            <label>Todo</label><br/>
            <input type="text" placeholder='Todo' onChange={(e) => setData({todo:e.target.value}) }/><br/>
            <button onClick ={()=> onAddHandler()}>Add</button>
            { todos.map((item, key) => <p>{item.work}<button onClick = {()=>onDeleteHandler(item.id)}>X</button></p>) }
            {console.log(props.id)}
        </div>
    )
}
