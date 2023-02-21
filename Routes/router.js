import { signUp } from "../Controllers/auth.controller.js";
import { login } from "../Controllers/auth.controller.js";
import { auth } from "../Middlewares/auth.js";
import { addNotes } from "../Controllers/note.controller.js";
import { displayNotes } from "../Controllers/note.controller.js";
import { deleteNotes } from "../Controllers/note.controller.js";
import { editNotes } from "../Controllers/note.controller.js";

import express from "express";

export const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/", auth, displayNotes);
router.post("/", auth, addNotes);
router.delete("/:id", auth, deleteNotes);
router.put("/:id", auth, editNotes);
