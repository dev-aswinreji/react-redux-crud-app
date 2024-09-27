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
        try {

            const result = await axios.post(`http://localhost:5000/api/users/login`, {
                email,
                password
            })
            console.log(result, 'result is shoinw in login page');
            if (result.data.token) {
                dispatch(userAuth(result.data.token))
                dispatch(userId(result.data.userid))
                toast.success('Login success')
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            }

        } catch (error) {
            console.log(error, 'Error in handleLogin Func');
            if (error.response) {
                if (error.response.status === 400) {
                    toast.warn("All fields are mandatory")
                } else if (error.response.status === 404) {
                    toast.error("Invalid credentials")
                } else if (error.response.status === 401) {
                    toast.error("Authorization denied")
                } else {
                    toast.error(error.response || error.response.status)
                }
            }
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
            <p>Don't have account ? <Link to={"/signup"}>Sign Up</Link></p>
        </>

    )
}