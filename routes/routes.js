import express from "express";
import authorRoutes from "./author.routes.js";
import bookRoutes from "./book.routes.js";
import readerRoutes from "./reader.routes.js";

export default function (app) {
  app.use(express.json());
  app.use("/authors", authorRoutes);
  app.use("/books", bookRoutes);
  app.use("/readers", readerRoutes);
}
