import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Layout from "../../components/Layout"
import Swal from 'sweetalert2'
import { createBrowserHistory } from 'history'

function BookShow() {
    const [id, setId] = useState(useParams().id); // eslint-disable-line
    const [book, setBook] = useState({ title: '', author: '', review: '' })
    const history = createBrowserHistory()

    useEffect(() => {
        fetchData()
    }, []) // eslint-disable-line

    const fetchData = () => {
        axios.get(`/api/v1/books/${id}`, {
            headers: {
                'token': localStorage.getItem('token')
            }
        })
            .then(function (response) {
                const book = response.data.data.book
                setBook(book)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const handleDelete = (id) => {
        const token = localStorage.getItem('token');
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const headers = { 'token': token };
                axios.delete(`/api/v1/books/${id}`, { headers })
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Book deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
                    .catch(function (error) {
                        if (error.response && error.response.status === 401) {
                            // Redirect to login if token expired
                            localStorage.removeItem('token');
                            history.push('/login');
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'An Error Occurred!',
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        }
                    });
            }
        })
    }

    return (
        <Layout>
            <div className="container" style={{ paddingBottom: '100px' }}>
                <div className="card">
                    <div className="card-header">
                        <h2>{book.book_title}</h2>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                <img
                                    src="https://img.icons8.com/clouds/300/books.png"
                                    alt="Book Cover"
                                    className="img-fluid"
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="mb-3">
                                    <h5 className="text-muted">Author:</h5>
                                    <p>{book.book_author}</p>
                                </div>
                                <div>
                                    <h5 className="text-muted">Review:</h5>
                                    <p>{book.book_review}</p>
                                </div>
                            </div>
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
            </div>
        </Layout>
    );
}

export default BookShow;