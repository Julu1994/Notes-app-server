import { isEmailValid, isPasswordValid } from "../Helper/validation.js";
import { User } from "../Models/userSchema.js";

export const signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } =
            req.body;
        const existingEmail = await User.findOne({ email });

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
        await User.create(newUser);
    } catch (err) {
        res.status(400).json("error");
    }
};
