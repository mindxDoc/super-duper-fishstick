import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState({});

    useEffect(() => {
        const checkTokenValidity = async () => {
            const token = localStorage.getItem('token');
            if (!token || token === 'undefined') {
                navigate('/login');
            } else {
                try {
                    const response = await axios.get('/auth/verify', {
                        headers: {
                            token,
                        },
                    });
                    if (response.data === true) {
                        getUser();
                    } else {
                        console.log(response.data.msg);
                        navigate('/login');
                    }
                } catch (error) {
                    console.log(error);
                    navigate('/login');
                }
            }
        };

        checkTokenValidity();
    }, []); // eslint-disable-line

    const getUser = () => {
        axios
            .get('/api/v1/user', {
                headers: {
                    token: localStorage.getItem('token'),
                },
            })
            .then((response) => {
                setUser(response.data.data.user[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const logoutAction = () => {
        axios
            .post(
                '/auth/logout',
                {},
                {
                    headers: {
                        token: localStorage.getItem('token'),
                    },
                }
            )
            .then(() => {
                localStorage.removeItem('token');
                navigate('/login');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const shouldShowNavigationFooter = !['/login', '/register'].includes(location.pathname);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div className="col-12">
                {shouldShowNavigationFooter && (
                    <nav
                        className="navbar navbar-expand-lg navbar-light fixed-top"
                        style={{ backgroundColor: '#fff', color: '#fff', height: '100px' }}
                    >
                        <div className="container-fluid">
                            <Link to="/" className="navbar-brand">
                                <img src="https://img.icons8.com/clouds/100/books.png" alt="Logo" className="navbar-logo" />
                                MindX Gamma
                            </Link>
                            <div className="d-flex align-items-center">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <span className="navbar-text" style={{ color: '#2c2b2b' }}>
                                            <strong>Welcome, {user.user_name}</strong>
                                        </span>
                                    </li>
                                </ul>
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link to="/create" className="nav-link" style={{ color: '#e31f26' }}>
                                            New reivew
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            onClick={() => logoutAction()}
                                            className="nav-link btn btn-outline-danger ml-3"
                                            style={{ color: '#2c2b2b', borderColor: '#e31f26' }}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                )}

                <div className="container" style={{ paddingTop: shouldShowNavigationFooter ? '100px' : '0' }}>
                    {children}
                </div>
            </div>

            {shouldShowNavigationFooter && (
                <footer style={{ marginTop: 'auto', backgroundColor: '#2c2b2b', color: '#fff', padding: '5px', textAlign: 'center' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <img
                                    src="https://img.icons8.com/clouds/100/books.png"
                                    alt="Company Logo"
                                    style={{ height: '50px', marginBottom: '10px' }}
                                />
                                <p>© 2023 Gamma Book. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </footer>
            )}
        </div>
    );
};

export default Layout;
