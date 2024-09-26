import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminAuth, adminLogout, adminUsersList, fetchData } from "../utils/adminSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminHome.css";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AdminHome() {
    const accessToken = useSelector((store) => store.admin.token);
    const usersList = useSelector((store) => store.admin.userslist);
    const adminid = useSelector((store) => store.admin.adminid);
    const { name, email } = useSelector((store) => store.admin.adminData);
    const [value, setValue] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
            localStorage.setItem("tokenAdmin", accessToken);
        }
    }, [accessToken, dispatch]);

    async function getAllUsersData() {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/userslist`);
            const { userslist } = response.data;
            dispatch(adminUsersList(userslist));
        } catch (error) {
            toast.error("Error occurred in fetching user data");
        }
    }

    async function getSpecificUser() {
        try {
            const response = await axios.post(`http://localhost:5000/api/admin/search`, { search: value });
            const { userslist } = response.data;
            dispatch(adminUsersList(userslist));
        } catch (error) {
            if (error.response?.status === 404) {
                toast.error("No user found");
            } else {
                toast.error(`Error: ${error.response?.data} and ${error.response?.status}`);
            }
        }
    }

    function handleSearch(e) {
        setValue(e.target.value);
    }

    function handleLogout() {
        toast.success("Logout successful");
        setTimeout(() => {
            dispatch(adminLogout(null));
            localStorage.removeItem("tokenAdmin");
            navigate("/admin/login");
        }, 1000);
    }

    async function handleUser(email, auth) {
        console.log(email, 'item is here');
        if (auth) {
            const response = await axios.post(`http://localhost:5000/api/admin/block`, {
                email: email
            })
            console.log(response, 'reponse is here');
        } else if (!auth) {
            const response = await axios.post(`http://localhost:5000/api/admin/unblock`, {
                email: email
            })
            console.log(response, 'reponse is here');
        }
    }

    return (
        <div className="admin-home">
            <div className="admin-header">
                <h1>Welcome, {name}</h1>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>

            <div className="admin-actions">
                <button onClick={getAllUsersData} className="fetch-button">Get All Users</button>
                <div className="search-bar">
                    <input
                        type="text"
                        name="search"
                        value={value}
                        onChange={handleSearch}
                        placeholder="Search for a user..."
                    />
                    <button onClick={getSpecificUser} className="search-button">Search</button>
                </div>
            </div>

            <div className="user-list-container">
                {usersList && usersList.length > 0 ? (
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersList.map((item) => (
                                <tr key={item.userid}>
                                    <td>{item.userid}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        {item.auth ? (
                                            <button
                                                onClick={() => handleUser(item.email, item.auth)}
                                                className="block-button"
                                            >
                                                BLOCK
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleUser(item.email, item.auth)}
                                                className="unblock-button"
                                            >
                                                UNBLOCK
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                ) : (
                    <p className="no-users">No users found.</p>
                )}
            </div>

            <ToastContainer />
        </div>
    );
}
