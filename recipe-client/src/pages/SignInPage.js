import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session } from '../requests';


const SignInPage = (props) => {
    const navigate = useNavigate();
    const { onSignIn } = props;

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    function handleSubmit(event) {
        event.preventDefault();
        const params = {
            email: email,
            password: password
        }

        Session.create(params).then((data) => {
            if (data.status === 404) {
                setErrors([...errors, {message:"Wrong email or password"}])
            }
            else if (data.id) {
                onSignIn()
                navigate('/');
            }
        })
    }


    return (
        <div className="container w-50">
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                {errors.length > 0 ? (
                    <div>
                        <h4>Failed to Signed In</h4>
                        <p>{errors.map(error => error.message).join(" ,")}</p>
                    </div>
                ):(" ")}
                <div className="mt-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input className="form-control" type="text" name="email" id="email" onChange={(event) => {
                        setEmail(event.target.value);
                    }}/>
                </div>
                <div className="mt-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input className="form-control" type="password" name="password" id="password" onChange={event => {
                        setPassword(event.target.value);
                     }} />
                </div>
                <input type="submit" value="Sign In" className="btn btn-secondary w-100 mt-3"/>
            </form>
        </div>
    )

}

export default SignInPage;