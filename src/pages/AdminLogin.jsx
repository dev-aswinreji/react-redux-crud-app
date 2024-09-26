import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { userAuth, userId } from "../utils/userSlice"
import { toast } from "react-toastify"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const inputRef = useRef(null)
    useEffect(() => {
        inputRef.current.focus()
    }, [])
    async function handleLogin(e) {
        e.preventDefault()
        const result = await axios.post(`http://localhost:5000/api/admin/login`, {
            email,
            password
        })
        console.log(result, 'result is shoinw in login page');
        if (result.data.token) {
            dispatch(userAuth(result.data.token))
            dispatch(userId(result.data.userid))
            toast.success('Login Success')
            navigate("/")
        } else {
            alert('Invalid Credentials')
        }
    }
    return (
        <>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email</label>
                <br />
                <input type="email" id="email" name="email" ref={inputRef}
                    placeholder="Your email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label htmlFor="password">Password</label>
                <br />
                <input type="password" id="password" name="password"
                    placeholder="Your password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button>Login </button>
            </form>
             </>
    )
}