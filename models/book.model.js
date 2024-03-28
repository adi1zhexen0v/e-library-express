import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { _id: false }
);

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  publicationYear: {
    type: Number,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  reviews: {
    type: [reviewSchema],
    default: [],
  },
  readers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Reader",
    default: [],
  },
});

export const Book = mongoose.model("Book", bookSchema);
