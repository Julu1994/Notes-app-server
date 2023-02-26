/**
@file router.js
@description Defines all routes for the backend server application
@requires express.Router
@requires ../Controllers/auth.controller
@requires ../Middlewares/authMiddleware
@requires ../Controllers/note.controller
*/
const route = require("express").Router();
const { signUp, login } = require("../Controllers/auth.controller");
const { auth } = require("../Middlewares/authMiddleware");
const {
    addNotes,
    displayNotes,
    deleteNotes,
    editNotes,
} = require("../Controllers/note.controller");

route.post("/auth/signup", signUp);
route.post("/auth/login", login);
route.get("/notes/all", auth, displayNotes);
route.post("/create/new/notes", auth, addNotes);
route.delete("/note/delete/:noteId", auth, deleteNotes);
route.put("/note/edit/:noteId", auth, editNotes);
module.exports = route;
