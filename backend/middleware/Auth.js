import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import {User} from "../models/User.js";

export const isAuthenticatedUser = asyncHandler(async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {
        return next(new Error('Login first'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    next();
});

export const isAdmin = asyncHandler(async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {
        return next(new Error('Login first'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);

    if(req.user.role !== 'admin'){
        return next(new Error('Only admin can access this resource'));
    }
    next();
});