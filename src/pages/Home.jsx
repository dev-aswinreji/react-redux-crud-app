import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addImage } from '../utils/userSlice';

export default function PersonalProfile() {
    const token = useSelector((store) => store.user.session);
    const navigate = useNavigate();
    const accessToken = token[0];
    const dispatch = useDispatch()
    const [profilePic, setProfilePic] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (accessToken) {
            axios.get("http://localhost:5000/api/users/home", {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }).then(res => {
                console.log(res, 'res is here');
            }).catch(error => {
                navigate("/login");
                console.error('Error fetching user data:', error);
            });
        } else {
            navigate("/login");
        }
    }, [accessToken, navigate]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setProfilePic(URL.createObjectURL(selectedFile));
        }
    };
    const handleUpload = async () => {

        if (file) {

            try {
                 await axios.post('http://localhost:5000/api/upload', { fileName: file?.name }, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }

                });
                alert("File uploaded successfully");
                dispatch(addImage(profilePic))
            } catch (error) {
                console.error('Error uploading file', error);
            }
        } else {
            alert("Please select a file to upload");
        }
    };

    return (
        <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="6" className="mb-4 mb-lg-0">
                        <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                            <MDBRow className="g-0">
                                <MDBCol md="4" className="gradient-custom text-center text-black"
                                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>

                                    {/* Show preview if profilePic exists, otherwise fallback */}
                                    <MDBCardImage
                                        src={profilePic || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"}
                                        alt="Profile Pic"
                                        className="my-5"
                                        style={{ width: '80px' }}
                                        fluid
                                    />

                                    <input type="file" accept="image/*" onChange={handleFileChange} />
                                    <button onClick={handleUpload}>Upload</button>

                                    <MDBTypography tag="h5">Marie Horwitz</MDBTypography>
                                    <MDBCardText>Web Designer</MDBCardText>
                                    <MDBIcon far icon="edit mb-5" />
                                </MDBCol>
                                <MDBCol md="8">
                                    <MDBCardBody className="p-4">
                                        <MDBTypography tag="h6">Information</MDBTypography>
                                        <hr className="mt-0 mb-4" />
                                        <MDBRow className="pt-1">
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Email</MDBTypography>
                                                <MDBCardText className="text-muted">info@example.com</MDBCardText>
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Phone</MDBTypography>
                                                <MDBCardText className="text-muted">123 456 789</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>

                                        <div className="d-flex justify-content-start">
                                            <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                                            <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                                            <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                                        </div>
                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>

    );
}
