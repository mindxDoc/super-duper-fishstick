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
    const [errors, setErrors] = useState({});

    function validateForm() {
        let formIsValid = true;
        const newErrors = {};

        // Validate the title field
        if (title.trim() === '') {
            formIsValid = false;
            newErrors.title = 'Title is required';
        }

        // Validate the author field
        if (author.trim() === '') {
            formIsValid = false;
            newErrors.author = 'Author is required';
        }

        // Validate the review field
        if (review.trim() === '') {
            formIsValid = false;
            newErrors.review = 'Review is required';
        }

        setErrors(newErrors);
        return formIsValid;
    }

    const handleSave = () => {
        if (!validateForm()) {
            return;
        }

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
                                    {errors.title && <div className="text-danger">{errors.title}</div>}
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
                                    {errors.author && <div className="text-danger">{errors.author}</div>}
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
                                    {errors.review && <div className="text-danger">{errors.review}</div>}
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