import React from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./BookCard.css"; 


function BookCard({ _id, title, author, cover, year, language, rating }) {
    console.log("BookCard received ID:", _id); // Debugging: Ensure 'id' is received
    const deleteBook = async () => {
        if (!_id) {
            toast.error("Book ID is missing");
            return;
        }
    
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/deleteBookById/${_id}`);
            toast.success(response.data.message);
            window.location.reload()
        } catch (error) {
            toast.error("Failed to delete the book");
        }
    };
   
    const navigate = useNavigate();

    return (
        <div className="book-card">
            <img src={cover} alt={title} />
            <h3>{title}</h3>
            <p>Author: {author}</p>
            <p>Year: {year}</p>
            <p>Language: {language}</p>
            <p>Rating: {rating}⭐</p>
            <div className="buttons1">
                <button className="btn1 delete-btn1" onClick={deleteBook}>🗑Delete</button>
                <button className="btn1 edit-btn1" onClick={()=>{navigate(`/film/edit/${_id}`)}}>✏️Edit</button>
            </div>
            <Toaster />
        </div>
    );
}

export default BookCard;
