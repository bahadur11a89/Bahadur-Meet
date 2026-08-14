import httpStatus from "http-status";

const adminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== 'ADMIN') {
        return res.status(httpStatus.FORBIDDEN).json({
            success: false,
            message: "Access denied. Admin authorization required.",
        });
    }
    next();
};

export default adminMiddleware;
