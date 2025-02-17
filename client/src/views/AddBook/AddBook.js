import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./AddBook.css";

function AddBook({ onBookAdded }) {
    const [book, setBook] = useState({
        title: "",
        author: "",
        cover: "",
        language: "",
        rating: "",
        year:""
    });

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/books`, book);
            toast.success("Book added successfully!");
            setBook({ title: "", author: "", cover: "", language: "", rating: "",year:"" });
            onBookAdded(); // Refresh book list after posting
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add book!");
        }
    };

    return (
        <div className="post-container">
            <h2>Add a New Book</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={book.title} onChange={handleChange} placeholder="Title" required />
                <input type="text" name="author" value={book.author} onChange={handleChange} placeholder="Author" required />
                <input type="text" name="cover" value={book.cover} onChange={handleChange} placeholder="Cover Image URL" required />
                <input type="number" name="year" value={book.year} onChange={handleChange} placeholder="Publication Year" required />

                <input type="text" name="language" value={book.language} onChange={handleChange} placeholder="Language" required />
                <input type="number" step="0.1" name="rating" value={book.rating} onChange={handleChange} placeholder="Rating (1-5)" required />
                <button type="submit">Submit</button>
            </form>
            <Toaster />
        </div>
    );
}

export default AddBook;
