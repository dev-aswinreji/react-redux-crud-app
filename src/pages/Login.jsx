import axios from "axios"
import { useState } from "react"

export default function Login () {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    async function handleLogin(e)  {
        e.preventDefault()
        const resutl = await axios.post(`http://localhost:5000/api/users/login`,{
            email,
            password
        })
    }
    return (
        <>
        <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <br />
        <input type="email" id="email" name="email"
            placeholder="Your email"
            onChange={(e)=>setEmail(e.target.value)}
         />
         <br />
         <label htmlFor="password">Password</label>
         <br />
        <input type="password" id="password" name="password" 
        placeholder="Your password"
            onChange={(e)=>setPassword(e.target.value)}
         />
         <br />
         <button>Login </button>
        </form>
        </>
    )
}