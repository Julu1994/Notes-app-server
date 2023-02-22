const router = require("express").Router();
const { signUp, login } = require("../Controllers/auth.controller");
const { auth } = require("../Middlewares/authMiddleware");
const {
    addNotes,
    displayNotes,
    deleteNotes,
    editNotes,
} = require("../Controllers/note.controller");

router.post("/signup", signUp);
router.post("/login", login);
router.get("/", auth, displayNotes);
router.post("/", auth, addNotes);
router.delete("/:id", auth, deleteNotes);
router.put("/:id", auth, editNotes);
router.get("/test", async (req, res) => {
    res.send("Server is up and running");
});
module.exports = router;
