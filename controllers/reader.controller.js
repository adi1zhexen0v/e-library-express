import { Reader } from "../models/reader.model.js";
import { Book } from "../models/book.model.js";

export const getAllReaders = async (req, res) => {
  try {
    const readers = await Reader.find().populate("books");
    res.json(readers);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

export const createReader = async (req, res) => {
  try {
    const newReader = new Reader(req.body);
    const savedReader = await newReader.save();
    res.status(201).json(savedReader);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

export const getReaderById = async (req, res) => {
  try {
    const reader = await Reader.findById(req.params.id).populate("books");
    if (!reader) {
      return res.status(404).json({ message: "Читатель не найден" });
    }
    res.json(reader);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

export const updateReader = async (req, res) => {
  try {
    const updatedReader = await Reader.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReader) {
      return res.status(404).json({ message: "Читатель не найден" });
    }
    res.json(updatedReader);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

export const deleteReader = async (req, res) => {
  try {
    const reader = await Reader.findByIdAndDelete(req.params.id);
    if (!reader) {
      return res.status(404).json({ message: "Читатель не найден" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

export const addBookToReader = async (req, res) => {
  try {
    const { readerId, bookId } = req.params;
    const reader = await Reader.findByIdAndUpdate(readerId, {
      $push: { books: bookId },
    });
    const book = await Book.findByIdAndUpdate(bookId, {
      $push: { readers: readerId },
    });

    if (!reader || !book) {
      return res.status(404).json({ message: "Читатель или книга не найден" });
    }

    res.status(201).send({ message: "Книга успешно добавлена читателю" });
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

export const removeBookFromReader = async (req, res) => {
  try {
    const { readerId, bookId } = req.params;
    const reader = await Reader.findByIdAndUpdate(readerId, {
      $pull: { books: bookId },
    });

    const book = await Book.findByIdAndUpdate(bookId, {
      $pull: { readers: readerId },
    });

    if (!reader || !book) {
      return res.status(404).json({ message: "Читатель или книга не найден" });
    }

    res.send({ message: "Книга успешно удалена у читателя" });
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
