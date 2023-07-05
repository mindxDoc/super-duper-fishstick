import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && token !== 'undefined' && token !== null) {
            navigate('/');
        }
    }, []); // eslint-disable-line

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const loginAction = async (e) => {
        e.preventDefault();
        setErrors({});
        setIsSubmitting(true);

        let formErrors = {};

        if (!email) {
            formErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formErrors.email = 'Invalid email format.';
        }

        if (!password) {
            formErrors.password = 'Password is required.';
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setIsSubmitting(false);
            return;
        }

        let payload = {
            email: email,
            password: password,
        };

        try {
            const response = await axios.post('/auth/login', JSON.stringify(payload), {
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                withCredentials: false,
            });

            const { data } = response;
            if (response.status === 200) {
                localStorage.setItem('token', data.jwtToken);
                navigate('/');
            } else {
                setErrors({ general: 'Invalid email or password.' });
            }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({
                    general: 'An error occurred. Please try again.',
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Layout>
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="row border rounded-5 p-3 bg-white shadow box-area">
                    <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{ background: "#e31f26" }}>
                        <div className="featured-image mb-3">
                            <img src="https://img.icons8.com/bubbles/300/enter-2.png" alt='login logo' className="img-fluid" style={{ width: 250 + "px" }} />
                        </div>
                        <p className="text-white fs-2">Be Verified</p>
                        <small className="text-white text-wrap text-center">Join experienced Designers on this platform.</small>
                    </div>

                    <div className="col-md-6 right-box">
                        <div className="row align-items-center">
                            <div className="header-text mb-4">
                                <h2>Hello, Again</h2>
                                <p>We are happy to have you back.</p>
                            </div>
                            <form onSubmit={loginAction}>
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
                                {errors.general && (
                                    <p className="text-center">
                                        <small className="text-danger">{errors.general}</small>
                                    </p>
                                )}
                                <div className="input-group mb-3">
                                    <button disabled={isSubmitting}
                                        className="btn btn-lg btn-primary w-100 fs-6">Login</button>
                                </div>
                                <div className="row">
                                    <small>Don't have account? <Link to="/register">Register here</Link></small>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Login;