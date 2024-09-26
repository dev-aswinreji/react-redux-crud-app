import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { adminAuth, adminLogout, adminUsersList, fetchData } from "../utils/adminSlice"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./AdminHome.css";
import { toast, ToastContainer } from "react-toastify"

export default function AdminHome() {
    const accessToken = useSelector((store) => store.admin.token)
    const usersList = useSelector((store) => store.admin.userslist)
    const adminid = useSelector((store) => store.admin.adminid)
    const [value, setValue] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    console.log(accessToken, 'accessToken is here');

    useEffect(() => {
        const storedToken = localStorage.getItem("tokenAdmin");
        if (storedToken && !accessToken) {
            dispatch(adminAuth(storedToken));
        }
        if (!storedToken && !accessToken) {
            navigate("/admin/login");
        }
    }, [dispatch, navigate]);

    useEffect(() => {
        if (accessToken) {
            dispatch(fetchData({ accessToken, endpoint: '/home', method: 'GET' }));
            localStorage.setItem("tokenAdmin", accessToken)
        }
    }, [accessToken, dispatch])

    async function getAllUsersData() {
        try {

            const response = await axios.get(`http://localhost:5000/api/admin/userslist`)
            const { userslist } = response.data
            console.log(userslist);
            dispatch(adminUsersList(userslist))

        } catch (error) {
            console.log(error, "Error in getAll UsersData func");
            toast.error("Error occured in admin Home")
        }
    }

    async function getSpecificUser() {
        try {

            const response = await axios.post(`http://localhost:5000/api/admin/search`, {
                search: value
            })
            console.log(response, 'response is showing');
            const { userslist } = response.data
            dispatch(adminUsersList(userslist))

        } catch (error) {
            console.log(error, "Error in getSpecificUser");
            if (error.response) {
                if (error.response.status === 404) {
                    toast.error("No user found", {
                        position: "top-right"
                    })
                } else {
                    toast.error(`Error: ${error.response.data} and ${error.response.status}`)
                }
            }
        }
    }
    function handleSearch(e) {
        e.preventDefault()
        setValue(e.target.value)
    }

    function handleLogout() {
        toast.success("logout success")
        setTimeout(() => {
            dispatch(adminLogout(null))
            localStorage.removeItem("tokenAdmin")
            navigate("/admin/login")
        }, 1000)
    }
    return (
        <div className="admin-home">
            <h1>Welcome to Admin Panel</h1>
            <h1>{adminid}number</h1>
            <button onClick={getAllUsersData} className="fetch-button">Get User Data</button>
            <button onClick={handleLogout} style={{ textAlign: "end" }}>Logout</button>
            <br />

            <input type="text" name="search" id="" value={value} onChange={handleSearch} />
            <button onClick={getSpecificUser}>Search</button>

            {usersList && usersList.length > 0 ? (
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersList.map((item) => (
                            <tr key={item.userid}>
                                <td>{item.userid}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No users found.</p>
            )}
            <ToastContainer />
        </div>
    );
}