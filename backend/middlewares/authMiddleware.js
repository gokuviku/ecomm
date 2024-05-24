import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from './asyncHandler.js';

const authenticate = asyncHandler(async (req, res, next) => {
    let token;
    // Read JWT from cookie
    token = req.cookies.jwt
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded JWT:', decoded); // Add this line for logging
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            console.error('JWT Verification Error:', error); // Add this line for logging
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

// Check for the admin 
const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        // If user is admin then go to next
        next();
    } else {
        res.status(401).send("Not authorized as admin");
    }
}

export { authenticate, authorizeAdmin };
