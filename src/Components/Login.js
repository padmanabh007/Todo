import axios from 'axios'
import { createContext, useState } from 'react'
import Todo from './Todo'

export const context = createContext()

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [data, setData] = useState([])

  

    const login = () => {
        //console.log({email:email, password:password})
        axios.get(`http://localhost:5000/login/${email}/${password}`)
        .then(response => setData([response.data,true]))
        .catch(error => console.log(error))
    }
  

    return (
        <div>
            <label>Email</label>
            <input type="email" placeholder='Email' onChange={(e)=> setEmail(e.target.value) }/><br/>
            <label>Password</label>
            <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/><br/>
            <button onClick={() => login()}>Submit</button>
            {data[1] ? <context.Provider value={data[0]}><Todo/></context.Provider>:''}
            
        </div>
    )
}
