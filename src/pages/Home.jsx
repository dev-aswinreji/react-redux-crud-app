import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addImage, signOut, userAuth, userData, userId } from '../utils/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './PersonalProfile.css';

export default function PersonalProfile() {
    const accessToken = useSelector((store) => store.user.token);
    const userid = useSelector((store) => store.user.userid);
    const { name, email } = useSelector((store) => store.user.userDatas);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [profilePic, setProfilePic] = useState(localStorage.getItem(userid) || null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (!accessToken && storedToken) {
            dispatch(userAuth(storedToken));
        }

        if (!accessToken && !storedToken) {
            navigate("/login");
        }
    }, [accessToken, dispatch, navigate]);

    useEffect(() => {
        if (accessToken) {

            axios.get("http://localhost:5000/api/users/home", {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }).then(res => {
                const { userid, name, email } = res.data.userData;
                dispatch(userId(userid));
                dispatch(userData({ name, email }));
            }).catch(error => {
                console.error('Error fetching user data:', error);
                navigate("/login");
            });
            // Persist token in localStorage
            localStorage.setItem("token", accessToken);
        }
    }, [accessToken, userid, dispatch, navigate]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setFile(selectedFile);
            setProfilePic(imageUrl);
            localStorage.setItem(userid, imageUrl);
        }
    };

    const handleUpload = async () => {
        if (file) {
            try {
                const response = await axios.post('http://localhost:5000/api/users/upload', { fileName: profilePic }, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.data.message) {
                    dispatch(addImage(profilePic));
                    toast.success("File uploaded successfully!");
                }
            } catch (error) {
                console.error('Error uploading file', error);
                toast.error("Error uploading file");
            }
        } else {
            toast.warn("Please select a file to upload", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    const loadImage = () => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            dispatch(userAuth(storedToken));
        }

        const storedImage = localStorage.getItem(userid);
        if (storedImage) {
            setProfilePic(storedImage);
        }
    };

    useEffect(() => {
        loadImage();
    }, [userid]);

    const handleSignOut = () => {
        dispatch(signOut());
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="profile-container vh-100">
            <div className="profile-card">
                <div className="left-panel">
                    <div className="profile-pic-wrapper">
                        <img
                            src={profilePic || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"}
                            alt="Profile Pic"
                            className="profile-pic"
                        />
                    </div>
                    <div className="upload-section">
                        <input type="file" accept="image/*" onChange={handleFileChange} className="form-control" />
                        <button onClick={handleUpload} className="btn btn-primary mt-3">Upload</button>
                    </div>
                </div>
                <div className="right-panel">
                    <h3 className="profile-name">{name || "User Name"}</h3>
                    <p className="profile-title">Software Developer</p>
                    <div className="info-section">
                        <h6>Email</h6>
                        <p className="text-muted">{email || "user@example.com"}</p>

                        <h6>Phone</h6>
                        <p className="text-muted">123 456 789</p>
                    </div>
                    <div className="social-links">
                        <a href="#!" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                        <a href="#!" className="social-icon"><i className="fab fa-twitter"></i></a>
                        <a href="#!" className="social-icon"><i className="fab fa-instagram"></i></a>
                    </div>
                    <button className="btn btn-danger mt-4" onClick={handleSignOut}>Sign Out</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
