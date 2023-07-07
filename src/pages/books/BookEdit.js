import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../../components/Layout"

function BookEdit() {
    const [id, setId] = useState(useParams().id) // eslint-disable-line
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [review, setReview] = useState('');
    const [isSaving, setIsSaving] = useState(false)
    const navigate = useNavigate();
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

    useEffect(() => {
        fetchData()
    }, []) // eslint-disable-line

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const headers = { 'token': token };
                    const response = await axios.get(`/api/v1/books/${id}`, { headers })
                    let project = response.data.data.book;
                    setTitle(project.book_title);
                    setAuthor(project.book_author);
                    setReview(project.book_review);
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }


    const handleSave = () => {
        if (!validateForm()) {
            return;
        }

        setIsSaving(true);
        const token = localStorage.getItem('token');
        const headers = { 'token': token };
        axios.put(`/api/v1/books/${id}`, {
            title: title,
            author: author,
            review: review,
        }, { headers })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Project updated successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
                navigate(`/show/${response.data.data.book.book_id}`)
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false)
            });
    }

    return (
        <Layout>
            <div className="container" style={{ paddingBottom: '50px' }}>
                <h2 className="text-center mt-5 mb-3">Edit Project</h2>
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
                                <label htmlFor="title">Title</label>
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
                                className="btn btn-outline-success mt-3">
                                Update Project
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default BookEdit;