import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminAuth, adminLogout, adminUsersList, fetchData } from "../utils/adminSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminHome.css";
import { toast } from "react-toastify";
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
            if (accessToken) {
                const response = await axios.get(`http://localhost:5000/api/admin/userslist`, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                });
                const { userslist } = response.data;
                dispatch(adminUsersList(userslist));
            }
        } catch (error) {
            toast.error("Error occurred in fetching user data");
        }
    }

    async function getSpecificUser(value) {
        try {
            if (accessToken) {
                const response = await axios.post(`http://localhost:5000/api/admin/search`, { search: value }, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                });
                const { userslist } = response.data;
                dispatch(adminUsersList(userslist));
            } else {
                navigate("/admin/login")
            }
        } catch (error) {
            if (error.response?.status === 404) {
                toast.error("No user found");
            } else {
                toast.error(`Error: ${error.response?.data} and ${error.response?.status}`);
            }
        }
    }

    function handleSearch(e) {
        setValue(e.target.value || "");
        getSpecificUser(e.target.value)
    }

    function handleLogout() {
        toast.success("Logout successful");
        setTimeout(() => {
            dispatch(adminLogout(null));
            localStorage.removeItem("tokenAdmin");
            navigate("/admin/login");
        }, 1000);
    }

    async function handleUser(email, currentAuth) {
        const updatedUsersList = usersList.map(user =>
            user.email === email ? { ...user, auth: !currentAuth } : user
        )
        dispatch(adminUsersList(updatedUsersList))
        try {

            if (currentAuth && accessToken) {
                const response = await axios.post(`http://localhost:5000/api/admin/block`, {
                    email
                }, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                })
                toast.success("User blocked successfully")
            } else if (!currentAuth && accessToken) {
                const response = await axios.post(`http://localhost:5000/api/admin/unblock`, {
                    email
                }, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
                )
                toast.success("User unblocked successfully")
            }
        } catch (error) {
            console.log(error, "Error caught in handleUser");
        }
    }

    useEffect(() => {
        getAllUsersData()
    }, [accessToken])

    return (
        <div className="admin-home">
            <div className="admin-header">
                <h1>Welcome, {name}</h1>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>

            <div className="admin-actions">
                <div className="search-bar">
                    <input
                        type="text"
                        name="search"
                        value={value}
                        onInput={handleSearch}
                        placeholder="Search for a user..."
                    />
                    {/* <button onClick={getSpecificUser} className="search-button">Search</button> */}
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

        </div>
    );
}
