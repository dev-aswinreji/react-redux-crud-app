import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    async function handleSignUp(e) {
        e.preventDefault()
        const result = await axios.post('http://localhost:5000/api/users/create', {
            name,
            email,
            password
        })
        console.log(result, 'result is showing here');
        if (result) {
            alert(
                'Signup Success'
            )
            navigate("/login")
        }else {
            alert('Some error occured',result.error)
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
        </>
    )
}