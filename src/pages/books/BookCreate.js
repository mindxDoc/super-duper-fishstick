import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../../components/Layout"

function BookCreate() {
    const navigate = useNavigate()
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [review, setReview] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        axios.post('/api/v1/books', {
            title: title,
            author: author,
            review: review,
        },
            {
                headers: {
                    'token': localStorage.getItem('token')
                }
            }
        )
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Project saved successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
                setTitle('');
                setAuthor('');
                setReview('');
                navigate(`/show/${response.data.data.book.book_id}`)
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
            });
    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Create New Project</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/">View All Projects
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Name</label>
                                <input
                                    onChange={(event) => { setTitle(event.target.value) }}
                                    value={title}
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="author">Author</label>
                                <textarea
                                    value={author}
                                    onChange={(event) => { setAuthor(event.target.value) }}
                                    className="form-control"
                                    id="author"
                                    rows="3"
                                    name="author"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="review">Review</label>
                                <textarea
                                    value={review}
                                    onChange={(event) => { setReview(event.target.value) }}
                                    className="form-control"
                                    id="review"
                                    rows="3"
                                    name="review"></textarea>
                            </div>
                            <button
                                disabled={isSaving}
                                onClick={handleSave}
                                type="button"
                                className="btn btn-outline-primary mt-3">
                                Save Book
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default BookCreate;