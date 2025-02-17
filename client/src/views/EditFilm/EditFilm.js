import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EditFilm.css';
import { toast, Toaster } from "react-hot-toast";

function EditFilm() {
    const [book, setBook] = useState({
        title: '',
        author: '',
        language: '',
        rating: '',
        cover:'',
        year:'',
    });
    const { id } = useParams();

    useEffect(() => {
        const loadBook = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/bookById/${id}`);
                console.log("API Response:", response.data);
                setBook(response.data.data || response.data);
            } catch (error) {
                console.error("Error fetching book data:", error);
            }
        };
        loadBook();
    }, [id]);

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const updateBook = async () => {
        if (!id) {
            toast.error("Book ID is missing");
            return;
        }

        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/updateBook/${id}`, book);
            toast.success(response.data.message || "Book updated successfully!");
        } catch (error) {
            toast.error("Failed to update the book");
        }
    };

    if (!book.title) {
        return <p>Loading...</p>;
    }

    return (
        <div className="edit-film-container">
            <h2>Edit Film</h2>
            <form className="edit-film-form">
                <label>Title:</label>
                <input type="text" name="title" value={book.title} onChange={handleChange} />

                <label>Author:</label>
                <input type="text" name="author" value={book.author} onChange={handleChange} />

                <label>Year:</label>
                <input type="number" name="year" value={book.year} onChange={handleChange} />

                <label>Language:</label>
                <input type="text" name="language" value={book.language} onChange={handleChange} />

                <label>Rating:</label>
                <input type="number" name="rating" value={book.rating} onChange={handleChange} />
                <input type="text" name="cover" value={book.cover} onChange={handleChange} placeholder="Cover Image URL" required />

                <button type="button" className="edit-btn" onClick={updateBook}>Update</button>
            </form>
            <Toaster />
        </div>
    );
}

export default EditFilm;
