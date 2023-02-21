import jwt from "jsonwebtoken";
import { config } from "../Config/config.js";
import { User } from "../Models/userSchema.js";

export const auth = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        } else if (req.cookies && req.cookies) {
            token = req.cookies.jwt;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized",
            });
        }

        const decodedJwtPayload = jwt.verify(token, config.JWT_SECRET);
        // console.log(decodedJwtPayload)
        const user = await User.findById(
            decodedJwtPayload._id,
            "name _id  email"
        );

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized",
            });
        }

        req.user = user;

        next();
    } catch (err) {
        return res
            .status(403)
            .json({ success: false, message: "Unauthorized" });
    }
};
