import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login () {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    async function handleLogin(e)  {
        e.preventDefault()
        const result = await axios.post(`http://localhost:5000/api/users/login`,{
            email,
        })
        console.log(result,'result is shoinw in login page');
       if(result.data === password)  {
        alert('Login Success')
        
        navigate("/")
       }else {
        alert('Invalid Credentials')
       }
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