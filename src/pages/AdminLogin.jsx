import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { userAuth, userId } from "../utils/userSlice"
import { toast, ToastContainer } from "react-toastify"
import { adminAuth, adminId } from "../utils/adminSlice"

export default function AdminLogin() {
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

            const result = await axios.post(`http://localhost:5000/api/admin/login`, {
                email,
                password
            })
            if (result.data.token) {
                dispatch(adminAuth(result.data.token))
                dispatch(adminId(result.data.userid))
                toast.success('Login Success')
                setTimeout(() => {
                    navigate("/admin")
                }, 1000)
            }

        } catch (error) {
            console.log(error, 'Error caught');
            if (error.response) {
                if (error.response.status === 401) {
                    toast.error("Invalid Credentials",{
                        position:"top-right"
                    })
                } else {
                    toast.error(`Error: ${error.response.data} and ${error.response.status}`)
                }
            }
        }
    }
    return (
        <>
            <h1>Welcome Admin</h1>
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
            <ToastContainer />
        </>
    )
}