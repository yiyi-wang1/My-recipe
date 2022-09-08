import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { User } from '../../requests'
import { useNavigate, useParams } from 'react-router-dom';

function UserEditProfileImage() {
    const [profileImg, setProfileImg] = useState(null);
    const navigate = useNavigate();
    const params = useParams();

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('profile_img', profileImg);

        User.update_profile_image(params.id, formData).then((data) => {
            if (data?.id) {
                navigate(`/users/${data.id}`)
            } else {
                console.log(data.errors)
            }
        })
    }
    
    function onImageChange(event) {
        setProfileImg(event.target.files[0])
    }

    return (
        <div className="container w-50 mt-3 d-flex flex-column align-items-center">
            <h5 className="mb-3">Upate your Profile Image</h5>
            {profileImg && (<Avatar src={`${URL.createObjectURL(profileImg)}`} alt="preivew" sx={{ width: 150, height: 150 }} />)}
            <form onSubmit={handleSubmit} className="mt-3">
                    <input type="file" accept="image/*" name="profile_img" id="profile_img" className="form-control" onChange={onImageChange} />
                    <input type="submit" value="Upload" className="btn btn-secondary w-100 mt-3"/>
            </form>
   
        </div>

    )
}

export default UserEditProfileImage