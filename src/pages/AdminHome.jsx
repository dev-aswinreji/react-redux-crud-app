import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { adminUsersList, fetchData } from "../utils/adminSlice"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./AdminHome.css";

export default function AdminHome() {
    const accessToken = useSelector((store) => store.admin.token)
    const usersList = useSelector((store) => store.admin.userslist)

    const navigate = useNavigate()
    console.log(accessToken, 'accessToken is here');
    const dispatch = useDispatch()
    useEffect(() => {
        if (accessToken) {
            dispatch(fetchData({ accessToken, endpoint: '/home', method: 'GET' }))
        }
    }, [accessToken, dispatch])

    async function getAllUsersData() {
        const response = await axios.get(`http://localhost:5000/api/admin/userslist`)
        const { userslist } = response.data
        console.log(userslist);
        dispatch(adminUsersList(userslist))
    }

    return (
        <div className="admin-home">
            <h1>Welcome to Admin Panel</h1>
            <button onClick={getAllUsersData} className="fetch-button">Get User Data</button>
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
        </div>
    );
}