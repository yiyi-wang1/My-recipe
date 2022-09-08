import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../requests'
import { CircularProgress } from '@mui/material';

const SignUpPage = (props) => {
    const navigate = useNavigate();

    const { onSignUp } = props;
    const [profileImg, setProfileImg] = useState({});
    const [uploaded, setIsUploaded] = useState(true);
    const [errors, setErrors] = useState([])

    function handleSubmit(event) {
        event.preventDefault();
        setIsUploaded(false);
        const { currentTarget } = event;
        const formData = new FormData();

        formData.append('first_name', currentTarget.first_name.value);
        formData.append('last_name', currentTarget.last_name.value);
        formData.append('email', currentTarget.email.value);
        formData.append('password', currentTarget.password.value);
        formData.append('password_confirmation', currentTarget.password_confirmation.value);
        formData.append('profile_img', profileImg);

        User.create(formData).then((user) => {
            if (user?.id) {
                onSignUp()
                setIsUploaded(true);
                navigate('/');
            }
        })
        
    }

    const onImgChange = (event) => {
        setProfileImg(event.target.files[0])
    }

    return (
        <>
            {uploaded ? (
                    <div className="container w-50">
                        <h1>Sign Up</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mt-3">
                                <label htmlFor="first_name" className="form-label">First Name</label>
                                <input type="text" name="first_name" id="first_name" className="form-control"/>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="last_name" className="form-label">Last Name</label>
                                <input type="text" name="last_name" id="last_name" className="form-control"/>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="text" name="email" id="email" className="form-control"/>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" name="password" id="password" className="form-control"/>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
                                <input type="password" name="password_confirmation" id="password_confirmation" className="form-control"/>
                            </div>
            
                            <div className="mt-3">
                                <label htmlFor="profile_img" className="form-label">Profile Image</label>
                                <input type="file" accept="image/*" name="profile_img" id="profile_img" className="form-control" onChange={ onImgChange } />
                            </div>
            
                            <input type="submit" value="Sign In" className="btn btn-secondary w-100 mt-3"/>
                        </form>
                    </div>
             ):(
                <CircularProgress />
            )}
        </>

    )
 }

export default SignUpPage;