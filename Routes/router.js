import { signUp } from "../Controllers/auth.controller.js";
import express from "express";

export const router = express.Router();

router.post("/auth", signUp);
