import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js';
import { logger } from '../config/logger.js';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        next(err);
        return;
    }
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
        return;
    }
    logger.error("Unhandled application error", {
        error: err.message,
        stack: err.stack,
        method: req.method,
        url: req.originalUrl,
    });
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
    });
}