import React from 'react'
import { User } from '../../requests'
import { useNavigate, useParams } from 'react-router-dom';

function UserEditPassword() {
    const navigate = useNavigate();
    const params = useParams();

    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.currentTarget);
        const input = {
            current_password: fd.get("current_password"),
            new_password: fd.get("new_password"),
            new_password_confirm: fd.get("new_password_confirm")
        }

        User.update_password(params.id, input).then((data) => {
            if (data?.id) {
                navigate(`/users/${data.id}`)
            } else {
                console.log(data.errors)
            }
            
        })
    }

  return (
      <div className='container w-50'>
          <form onSubmit={handleSubmit}>
                <div className="mt-3">
                    <label htmlFor="current_password" className="form-label">Current Password</label>
                    <input type="password" name="current_password" id="current_password" className="form-control"/>
                </div>
                <div className="mt-3">
                    <label htmlFor="new_password" className="form-label">New Password</label>
                    <input type="password" name="new_password" id="new_password" className="form-control"/>
                </div>
                <div className="mt-3">
                    <label htmlFor="new_password_confirmation" className="form-label">Confirm New Password</label>
                    <input type="password" name="new_password_confirmation" id="new_password_confirmation" className="form-control"/>
                </div>
                <input type="submit" value="Submit" className="btn btn-secondary w-100 mt-3"/>
          </form>
          
    </div>
  )
}

export default UserEditPassword