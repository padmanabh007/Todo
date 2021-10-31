import axios from 'axios'
import { useState } from 'react'

export default function SignUp() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [bool, setBool] = useState(false)
    const [data, setData] = useState([])

    const signUp = () => {
        if (password === confirmPassword){
            axios.post('http://localhost:5000/signup',{'email':email, 'password':password})
            .then(response => setData([response.data,true]))
            .catch(error => console.error(error))
        }
        else
            setBool(true)
    }



    return (
        <div>

            <input type="email" placeholder='Email' onChange={(e)=> setEmail(e.target.value) }/><br/>
            <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/><br/>
            <input type="password" placeholder='ConfirmPassword' onChange={(e) => setConfirmPassword(e.target.value)}/><br/>
            {bool ? <p>Both Passwords are not similar</p> :''}
            <button onClick={() => signUp()}>SignUp</button>
            {data[1] ? <Todo props={data[0]}/>:''}
            
        </div>
    )
}
