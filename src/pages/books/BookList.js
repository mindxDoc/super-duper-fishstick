import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import { createBrowserHistory } from 'history'
import Layout from "../../components/Layout"
import '../../index.css';
import { ScaleLoader } from 'react-spinners';

function BookList() {
    const navigate = useNavigate();
    const [books, setBookList] = useState([])
    const [results, setResults] = useState(0)
    const history = createBrowserHistory()
    const [isLoading, setIsLoading] = useState(false)

    const override = {
        display: "block",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderColor: "#e31f26",
    };

    useEffect(() => {
        fetchData();
    }, []) // eslint-disable-line

    const fetchData = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const headers = { 'token': token };
                const response = await axios.get('/api/v1/books', { headers });
                setBookList(response.data.data.book);
                setResults(response.data.results);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // Redirect to login if token expired
                    localStorage.removeItem('token');
                    history.push('/');
                } else {
                    console.error(error);
                }
            }
        }
        setIsLoading(false);
    };

    async function handleDelete(id) {
        const token = localStorage.getItem('token');

        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            });

            if (result.isConfirmed) {
                const headers = { token };

                const response = await axios.delete(`/api/v1/books/${id}`, { headers });

                if (response.status === 204) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Book deleted successfully!',
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    const updatedBooks = books.filter((book) => book.book_id !== id);
                    setBookList(updatedBooks);
                    fetchData()
                } else {
                    if (response.status === 401) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Unauthorized',
                            text: 'Please log in again.',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        localStorage.removeItem('token');
                        history.push('/');
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Failed to delete the book',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        fetchData()
                    }
                }
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'An Error Occurred!',
                showConfirmButton: false,
                timer: 1500,
            });
            console.error(error);
        }
    }

    return (
        <Layout>
            {isLoading ? (
                <div className="loading-animation">
                    <ScaleLoader cssOverride={override} color="#e31f26" loading={isLoading} size={150} />
                </div>
            ) : (
                <div className="row" style={{ paddingBottom: '30px' }}>
                    <p>You have saved <strong>{results} books</strong> in your store.</p>
                    <div className="d-flex flex-wrap">
                        {books.map((book) => (
                            <div className="col-lg-3 col-md-6 p-3" key={book.book_id}>
                                <div className="card h-100">
                                    <img
                                        className="card-img-top"
                                        src="https://img.icons8.com/clouds/300/books.png"
                                        alt="Book Background"
                                        onClick={() => navigate(`/show/${book.book_id}`)} style={{ cursor: 'pointer' }}
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title" onClick={() => navigate(`/show/${book.book_id}`)} style={{ cursor: 'pointer' }}>{book.book_title}</h5>
                                        <p className="card-text"><em>{book.book_author}</em></p>
                                        <p className="card-text">{book.book_review}</p>
                                        <div className="mt-auto d-flex justify-content-between">
                                            <Link
                                                to={`/edit/${book.book_id}`}
                                                className="btn btn-primary"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(book.book_id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default BookList;