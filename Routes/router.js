import { signUp } from "../Controllers/auth.controller.js";
import { login } from "../Controllers/auth.controller.js";
import { auth } from "../Middlewares/auth.js";
import express from "express";

export const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/", auth, async (req, res) => {
    res.send("Hello! you are authenticated");
});
