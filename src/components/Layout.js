import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';


const Layout = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState({});

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

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

    useEffect(() => {
        const detectMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        detectMobile();

        const handleResize = () => {
            detectMobile();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
            {shouldShowNavigationFooter && (
                <nav
                    className={`navbar navbar-expand-lg navbar-light fixed-top ${isMobile && isMenuOpen ? 'mobile-menu-open' : ''
                        }`}
                    style={{
                        backgroundColor: '#fff',
                        color: '#fff',
                        height: '100px',
                        transition: 'background-color 0.3s ease-in-out',
                    }}
                >
                    <div
                        className="container"
                        style={{
                            transition: 'background-color 0.3s ease-in-out',
                        }}
                    >
                        <Link to="/" className="navbar-brand">
                            <img src="https://img.icons8.com/clouds/100/books.png" alt="Logo" className="navbar-logo" />
                            MindX Gamma
                        </Link>

                        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
                            {isMenuOpen ? (
                                <FontAwesomeIcon icon={faTimes} /> // X icon
                            ) : (
                                <FontAwesomeIcon icon={faBars} /> // Hamburger icon
                            )}
                        </button>

                        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <span className="navbar-text" style={{ color: '#2c2b2b' }}>
                                        <strong>Welcome, {user.user_name}</strong>
                                    </span>
                                </li>
                            </ul>

                            <ul className="navbar-nav ml-auto order-lg-last">
                                <li className="nav-item">
                                    <Link to="/create" className="nav-link" style={{ color: '#e31f26' }}>
                                        New review
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button
                                        onClick={logoutAction}
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

            <div
                className="container mt-4"
                style={{ paddingTop: shouldShowNavigationFooter ? (isMenuOpen ? '200px' : '100px') : '0' }}
            >
                {children}
            </div>

            {shouldShowNavigationFooter && (
                <footer
                    style={{ marginTop: 'auto', backgroundColor: '#2c2b2b', color: '#fff', padding: '5px', textAlign: 'center' }}
                >
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
