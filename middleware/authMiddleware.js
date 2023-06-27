import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;
    console.log(req.cookies)
    // console.log("auth middleware req cookies -------" + req.cookies);
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        }
        catch (error) {
            res.status(401)
            throw new Error("Unauthorized Access, invalid token");
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, you must log in to access this content')
    }
})

export {protect}