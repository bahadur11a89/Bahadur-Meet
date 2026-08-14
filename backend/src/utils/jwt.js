import jwt from "jsonwebtoken";

export const generateAccessToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );
};

export const generateRefreshToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
        }
    );
};

export const verifyAccessToken = (token) => {
    return jwt.verify(
        token,
        process.env.JWT_SECRET
    );
};

export const verifyRefreshToken = (token) => {
    return jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET
    );
};

export const generateInviteToken = (payload, expiresIn = "24h") => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

export const verifyInviteToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return null;
    }
};