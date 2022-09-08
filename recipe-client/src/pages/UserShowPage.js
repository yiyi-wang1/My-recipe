import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Meal } from '../requests';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { Divider } from '@mui/material';

const UserShowPage = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({})

    useEffect(() => {
      getCurrentUser();
    }, [])
    
    const getCurrentUser = () => {
      User.current().then(user => { 
        if (user?.id) {
          console.log(user)
          setUser(user);
        }
      })
    }
  
  const deleteMeal = (id) => {
    Meal.destroy(id).then(data => {
      console.log(data);
      window.location.reload();
     })
  }

  const handleEditPassword = () => {
    navigate(`/users/${user.id}/update_password`);
  }

  const handleEditProfileImage = () => {
    navigate(`/users/${user.id}/update_profile_image`);
  }
    
    return (
        <>
        <div className='container mt-3'>
              <div className="d-flex flex-row">
                <div className="d-flex flex-column me-3 mt-5 pt-3">
                      <Avatar src={user.profile_img?.url} alt={ user.full_name} sx={{ width: 150, height: 150 }}/>
                      <div>{user.full_name}</div>
                      <div>{user.provider ? (<span>LogIn from: {user.provider} </span>) : (user.email)}</div>
                      <button onClick={handleEditPassword} class="btn btn-outline-primary mt-3">Edit Password</button>
                      <button onClick={handleEditProfileImage} class="btn btn-outline-primary mt-3">Edit Profile Image</button>
                </div>
                <div className="d-flex flex-column flex-grow-1 ms-5">
                  <h4 className='text-center'>User Meals</h4>
                  <div className="mt-3 d-flex flex-wrap">
                        {user.meals?.map((m, i) => {
                            const date = new Date(m.created_at);
                            return (
                                <div key={i} className="m-3 card card-width shadow-sm p-3">
                                  <h3> <Link to={`/meals/${m.id}`} className="link">{m.title}</Link></h3>
                                      {m.images?
                                          (<img className= "card-img-top p-3" src={m.images[0].url} alt='' />
                                          ) : (
                                          <img className= "card-img-top p-3" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"/>)
                                      }
                                    <small> Posted on {date.toLocaleDateString()}</small>
                                    <button type="button" onClick={()=> deleteMeal(m.id)} className="btn btn-sm btn-outline-danger">Delete</button>
                              </div>
                            )
                        })}
                   </div>
                  <h4 className='text-center mt-3'>User Reviews</h4>
                  <div className="mt-3 d-flex flex-column">
                            {user.comments?.map((c, i) => {
                              const date = new Date(c.created_at);
                              return (
                                <>
                                  <div key={i} className="mt-3 d-flex flex-row align-items-center mb-2">
                                    <div className="d-flex flex-column align-items-center me-3">
                                        <Avatar src={c.author_profile_img?.url} alt="profile" />
                                        <p>{ c.author_full_name}</p>
                                    </div>
                                    <div className="d-flex flex-column ms-3">
                                      <h3><Link to={`/meals/${c.meal_id}`} className="link">{c.meal_title}</Link></h3>
                                      <Rating name="read-only" value={c.rating} readOnly />
                                        <p>
                                            {c.body}
                                        </p>
                                        <small>
                                            Posted on {date.toLocaleDateString()}
                                        </small>
                                    </div>
                                  </div>
                                  <Divider />
                                </>
                                )
                            })}
                  </div>
                </div>
              </div>
            </div>
        </>
    )
}

export default UserShowPage;