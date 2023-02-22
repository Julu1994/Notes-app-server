/**
 * @description auth mddleware to check if request is authenticated.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The next middleware function.
 * @return {Object} Returns a 401 or 403 response if the token is invalid or there is an error in decoding the JWT.
 **/
const jwt = require("jsonwebtoken");
const config = require("../Config/config");
const { User } = require("../Models/userSchema");

module.exports.auth = async (req, res, next) => {
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
        console.log(err);
        return res
            .status(403)
            .json({ success: false, message: "Unauthorized" });
    }
};
