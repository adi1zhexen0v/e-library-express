import { Router } from "express";
import * as bookController from "../controllers/book.controller.js";

const router = Router();

router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.post("/", bookController.createBook);
router.post("/:id/reviews", bookController.addReviewToBook);
router.patch("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

export default router;
