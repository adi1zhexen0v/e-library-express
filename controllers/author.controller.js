import { Author } from "../models/author.model.js";

export const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find().populate("book");
    res.json(authors);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

export const createAuthor = async (req, res) => {
  try {
    const newAuthor = new Author(req.body);
    const savedAuthor = await newAuthor.save();
    res.status(201).json(savedAuthor);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

export const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).populate("book");
    if (!author) {
      return res.status(404).json({ message: "Автор не найден" });
    }
    res.json(author);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

export const updateAuthor = async (req, res) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAuthor) {
      return res.status(404).json({ message: "Автор не найден" });
    }
    res.json(updatedAuthor);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Автор не найден" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
