import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import BookCard from "../../components/BookCard/BooksCard";
import { useNavigate } from "react-router-dom";
import './Home.css'

function Home() {
    const [books, setBooks] = useState([]);

    // Fetch Books from Backend
    const loadBooks = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/books`);
            console.log("API Response:", response.data); // Debugging: Check if 'id' exists
            
            setBooks(response.data.data); // Ensure 'data' contains book objects
            toast.success("Books loaded successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch books!");
            console.error("Error fetching books:", error);
        }
    };

    useEffect(() => {
        loadBooks();
    }, []);
 const navigate = useNavigate();
    return (
        <div>
            <h1 className="header">📚 Book List</h1>
             <div className="book-container">
             <button className="create-btn" onClick={()=>{navigate(`/createbook`)}}>Create Books</button>
             

                            {books.map((book, index) => {
    console.log("Book data:", book); // Debugging: Ensure book object contains '_id'
    return (
       <BookCard
    key={book._id || index}
    _id={book._id}
    title={book.title}
    author={book.author}
    cover={book.cover}
    year={book.year} // Use this instead of `year`
    language={book.language}
    rating={book.rating}
/>

    );
})}
</div>
         

            <Toaster />
        </div>
    );
}

export default Home;
