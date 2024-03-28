import { Router } from "express";
import * as authorController from "../controllers/author.controller.js";

const router = Router();

router.get("/", authorController.getAllAuthors);
router.get("/:id", authorController.getAuthorById);
router.post("/", authorController.createAuthor);
router.patch("/:id", authorController.updateAuthor);
router.delete("/:id", authorController.deleteAuthor);

export default router;
