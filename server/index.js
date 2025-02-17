import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { getServer, getHealth, getNotFound } from './controller/BookController.js'
import Book from './Modules/Book.js'
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit if DB connection fails
    }
};
connectDB();

// Use the imported controller
app.get("/", getServer);
app.get("/health", getHealth);

app.post("/books", async (req, res) => {
    try {
        const { title, author, cover,  language, rating,year } = req.body;

        const newBook = new Book({
            title,
            author,
            cover,
          
            language,
            rating,
            year
        });

        const savedBook = await newBook.save();

        return res.status(201).json({
            success: true,
            message: "Book Created",
            data: savedBook,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error creating book",
            error: error.message
        });
    }
});

// Get book by ID
app.get("/bookById/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findOne({ _id: id })

        if (book) {
            return res.status(200).json({
                success: true,
                data: book,
                message: "Book fetched successfully",
            });
        } else {
            return res.status(404).json({
                success: false,
                data: null,
                message: "Book not found",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching book",
            error: error.message,
        });
    }
});

// Get all books
app.get("/books", async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).json({
            success: true,
            data: books,
            message: "Books fetched successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching books",
            error: error.message,
        });
    }
});

// Delete book by ID
app.delete("/deleteBookById/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.deleteOne({ _id: id });
        return res.status(200).json({
            success: true,
            message: "Book Deleted",
            data: book,
        });
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message,
            data: null,
        });
    }
});

// Update all fields of a book
app.put("/updateBook/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, cover, language, rating,year } = req.body; // Fields to update

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { title, author, cover, language, rating,year},
           
        );


        return res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating book",
            error: error.message,
        });
    }
});

// Update only book rating
app.patch("/updateBookRating/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { rating } = req.body;

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { rating },
            
        );

        return res.status(200).json({
            success: true,
            message: "Book rating updated successfully",
            data: updatedBook,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating book rating",
            error: error.message,
        });
    }
});




// Handle 404 errors
app.get("*", getNotFound);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
