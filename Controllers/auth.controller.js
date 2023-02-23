const { isEmailValid, isPasswordValid } = require("../Helper/validation");
const { User } = require("../Models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../Config/config");

/**
 * @Register New User
 * @Route POST /signup
 * @description Signuping new users and adding new user to DB.
 * @param {string} firstName.required >> User's first name
 * @param {string} lastName.required >> User's last name
 * @param {string} email.required >> User's email address
 * @param {string} password.required >> User's password
 * @param {string} confirmPassword.required >> Password confirmation
 * @returns {Object} A JSON object that shows http status codes, saves user data to DB.
 **/
module.exports.signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } =
            req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword)
            return res.status(400).json({
                errorMessage: "Required field is missing",
            });
        if (!isEmailValid(email))
            return res.status(400).json({
                errorMessage: "Invalid Email",
            });
        if (!isPasswordValid(password))
            return res.status(400).json({
                errorMessage:
                    "At least one Capital letter and one number are required",
            });
        if (password.length < 6)
            return res.status(400).json({
                errorMessage: "Password must be at least 6 character",
            });
        if (password !== confirmPassword)
            return res.status(400).json({
                errorMessage: "Password didn't match",
            });
        const existingEmail = await User.findOne({ email });
        if (existingEmail)
            return res.status(400).json({
                errorMessage: "This email has already been taken",
            });
        const name = `${firstName} ${lastName}`;
        const newUser = new User({
            name,
            email,
            password,
        });
        const user = await User.create(newUser);
        user.password = undefined;
        const token = jwt.sign(
            {
                _id: user._id,
            },
            config.JWT_SECRET,
            {
                expiresIn: "72h",
            }
        );
        const userPayload = {
            _id: user._id,
            name,
            email: user.email,
        };
        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ success: true, userPayload, token });
    } catch (err) {
        console.log(err);
        res.status(400).json("error..");
    }
};

/********************************************************
 * @User Login
 * @Route POST /signup
 * @description Login users with email and password.
 * @param {string} email.required >> User's email
 * @param {string} password.required >> User's password
 * @returns {Object} A JSON object that shows http status codes, send jwt token.
 ********************************************************/

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ errorMessage: "Invalid credentials!" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ errorMessage: "Invalid credentials..." });
        }
        user.password = undefined;
        const token = jwt.sign(
            {
                _id: user._id,
            },
            config.JWT_SECRET,
            {
                expiresIn: "72h",
            }
        );
        const userPayload = {
            _id: user._id,
            name: user.name,
            email: user.email,
        };
        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ success: true, userPayload, token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
};
