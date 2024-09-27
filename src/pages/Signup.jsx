import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    useEffect(()=>{
        const storedToken = localStorage.getItem("token")
        if(storedToken){
            navigate("/")
        }
    },[])
    async function handleSignUp(e) {
        e.preventDefault()
        try {

            const result = await axios.post('http://localhost:5000/api/users/', {
                name,
                email,
                password
            })
            console.log(result, 'result is showing here');
            if (result) {
                toast.success('Signup Success')
                setTimeout(() => {
                    navigate("/login")
                }, 1000)
            } else {
                alert('Some error occured', result.error)
            }
        } catch (error) {
            console.log(error, 'Error in handleSignUp Func');
            if (error.response) {
                console.log(error.response.status, 'what is it');
                if (error.response.status === 409) {
                    toast.error("Email already exist")
                } else if (error.response.status === 400) {
                    toast.warn("All fields are mandatory")
                }
            }
        }
    }
    return (
        <>
            <form onSubmit={handleSignUp}>
                <label htmlFor="name">Name</label>
                <br />
                <input type="text" name="name" id="name"
                    onChange={(e) => setName(e.target.value)}
                />
                <br />
                <label htmlFor="email">Email</label>
                <br />
                <input type="email" name="email" id="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label htmlFor="password">Password</label>
                <br />
                <input type="password" name="password" id="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button>Sign Up</button>
            </form>
            <p className="p-3">Already have account?
                <Link to={"/login"} >Login</Link>
            </p>
        </>
    )
}