import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminAuth, adminLogout, adminUsersList, fetchData } from "../utils/adminSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminHome.css";
import { toast, ToastContainer } from "react-toastify";

export default function AdminHome() {
    const accessToken = useSelector((store) => store.admin.token);
    const usersList = useSelector((store) => store.admin.userslist);
    const adminid = useSelector((store) => store.admin.adminid);
    const [value, setValue] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Load token from localStorage on component mount
    useEffect(() => {
        const storedToken = localStorage.getItem("tokenAdmin");
        if (storedToken) {
            dispatch(adminAuth(storedToken));
        } else {
            navigate("/admin/login"); // Navigate only if no token is found
        }
    }, [dispatch, navigate]);

    // Fetch admin home data when accessToken is available
    useEffect(() => {
        if (accessToken) {
            dispatch(fetchData({ accessToken, endpoint: '/home', method: 'GET' }));
            localStorage.setItem("tokenAdmin", accessToken); // Save token to localStorage
        }
    }, [accessToken, dispatch]);

    // Fetch all users data
    async function getAllUsersData() {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/userslist`);
            const { userslist } = response.data;
            dispatch(adminUsersList(userslist));
        } catch (error) {
            console.log(error, "Error in getAllUsersData function");
            toast.error("Error occurred in admin Home");
        }
    }

    // Fetch specific user data based on search input
    async function getSpecificUser() {
        try {
            const response = await axios.post(`http://localhost:5000/api/admin/search`, {
                search: value
            });
            const { userslist } = response.data;
            dispatch(adminUsersList(userslist));
        } catch (error) {
            console.log(error, "Error in getSpecificUser function");
            if (error.response && error.response.status === 404) {
                toast.error("No user found", { position: "top-right" });
            } else {
                toast.error(`Error: ${error.response?.data || error.message}`);
            }
        }
    }

    // Handle search input change
    function handleSearch(e) {
        setValue(e.target.value);
    }

    // Handle logout
    function handleLogout() {
        toast.success("Logout success");
        setTimeout(() => {
            dispatch(adminLogout());
            localStorage.removeItem("tokenAdmin"); // Clear token from localStorage
            navigate("/admin/login");
        }, 1000);
    }

    return (
        <div className="admin-home">
            <h1>Welcome to Admin Panel</h1>
            <button onClick={getAllUsersData} className="fetch-button">Get User Data</button>
            <button onClick={handleLogout} className="logout-button">Logout</button>
            <br />
            <input 
                type="text" 
                name="search" 
                placeholder="Search users..." 
                value={value} 
                onChange={handleSearch} 
                className="search-input"
            />
            <button onClick={getSpecificUser} className="search-button">Search</button>
            
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
