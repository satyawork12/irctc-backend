import type { Request, Response, NextFunction } from 'express';
import {AppError} from '../utils/AppError.js';

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    if(res.headersSent) {
        next(err);
        return;
    }
    if(err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
        return ;
    }
    console.error(err);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
    });
}