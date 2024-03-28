import { Book } from "../models/book.model.js";
import { Author } from "../models/author.model.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("author");
    res.json(books);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

export const createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    if (req.body.author) {
      await Author.findByIdAndUpdate(req.body.author, {
        $set: { book: savedBook._id },
      });
    }
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("author")
      .populate("readers");
    if (!book) {
      return res.status(404).json({ message: "Книга не найдена" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

export const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ message: "Книга не найдена" });
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Книга не найдена" });
    }
    if (book.author) {
      await Author.findByIdAndUpdate(book.author, { $unset: { book: "" } });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

export const addReviewToBook = async (req, res) => {
  try {
    const { text, rating } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $push: { reviews: { text, rating } },
      },
      { new: true }
    );
    if (!book) {
      return res.status(404).json({ message: "Книга не найдена" });
    }

    res.status(201).json(book);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
