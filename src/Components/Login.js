import axios from 'axios'
import { useState } from 'react'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

  

    const login = () => {
        //console.log({email:email, password:password})
        axios.get(`http://localhost:5000/login/${email}/${password}`)
        .then(response => console.log(response))
        .catch(error => console.error(error))
    }
  

    return (
        <div>
            <label>Email</label>
            <input type="email" placeholder='Email' onChange={(e)=> setEmail(e.target.value) }/><br/>
            <label>Password</label>
            <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/><br/>
            <button onClick={() => login()}>Submit</button>
            
        </div>
    )
}
