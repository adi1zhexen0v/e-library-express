import { Router } from "express";
import * as readerController from "../controllers/reader.controller.js";

const router = Router();

router.get("/", readerController.getAllReaders);
router.get("/:id", readerController.getReaderById);
router.post("/", readerController.createReader);
router.post("/:readerId/books/:bookId", readerController.addBookToReader);
router.patch("/:id", readerController.updateReader);
router.delete("/:id", readerController.deleteReader);
router.delete(
  "/:readerId/books/:bookId",
  readerController.removeBookFromReader
);
export default router;
