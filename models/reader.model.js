import mongoose from "mongoose";

const readerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  books: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Book",
  },
});

export const Reader = mongoose.model("Reader", readerSchema);
