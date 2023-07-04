import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import Layout from "../components/Layout"

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && token !== 'undefined' && token !== null) {
            navigate("/");
        } else {
            navigate('/register')
        }
    }, []) // eslint-disable-line

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const registerAction = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)

        let formErrors = {};

        if (!email) {
            formErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formErrors.email = 'Invalid email format.';
        }

        if (!name) {
            formErrors.name = 'Name is required.';
        }

        if (!password) {
            formErrors.password = 'Password is required.';
        } else if (password.length < 8) {
            formErrors.password = 'Password should be at least 8 characters long.';
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setIsSubmitting(false);
            return;
        }

        let payload = {
            name: name,
            email: email,
            password: password
        }

        try {
            const response = await axios.post(
                "/auth/register",
                JSON.stringify(payload),
                {
                    headers: { "Content-Type": "application/json; charset=UTF-8" },
                    withCredentials: false,
                })
            setIsSubmitting(false)
            localStorage.setItem('token', response.data.jwtToken)
            navigate("/");
        } catch (err) {
            setIsSubmitting(false)
            if (err.response.data.errors !== undefined) {
                setErrors(err.response.data.errors);
            }
        }
    }

    return (
        <Layout>
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="row border rounded-5 p-3 bg-white shadow box-area">
                    <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{ background: "#103cbe" }}>
                        <div className="featured-image mb-3">
                            <img src="https://img.icons8.com/bubbles/300/form.png" alt='register logo' className="img-fluid" style={{ width: 250 + "px" }} />
                        </div>
                        <p className="text-white fs-2">Be Verified</p>
                        <small className="text-white text-wrap text-center">Join experienced Designers on this platform.</small>
                    </div>

                    <div className="col-md-6 right-box">
                        <div className="row align-items-center">
                            <div className="header-text mb-4">
                                <h2>Hello,Again</h2>
                                <p>We are happy to have you back.</p>
                            </div>
                            <form onSubmit={(e) => { registerAction(e) }}>
                                <div className="input-group mb-3">
                                    <input type="text"
                                        className={`form-control form-control-lg bg-light fs-6 ${errors.name && 'is-invalid'}`}
                                        placeholder="Your Name"
                                        value={name}
                                        onChange={handleNameChange} />
                                    {errors.name && (
                                        <div className="invalid-feedback">{errors.name}</div>
                                    )}

                                </div>
                                <div className="input-group mb-3">
                                    <input type="text"
                                        className={`form-control form-control-lg bg-light fs-6 ${errors.email && 'is-invalid'}`}
                                        placeholder="Email address"
                                        value={email}
                                        onChange={handleEmailChange} />
                                    {errors.email && (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    )}
                                </div>
                                <div className="input-group mb-1">
                                    <input type="password"
                                        className={`form-control form-control-lg bg-light fs-6 ${errors.password && 'is-invalid'}`}
                                        placeholder="Password"
                                        value={password}
                                        onChange={handlePasswordChange} />
                                    {errors.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )}
                                </div>
                                <div className="input-group mb-3">
                                    <button disabled={isSubmitting}
                                        className="btn btn-lg btn-primary w-100 fs-6">Register now</button>
                                </div>
                                <div className="row">
                                    <small>Have already an account? <Link to="/login">Login here</Link></small>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Register;