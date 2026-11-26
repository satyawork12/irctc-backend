import { Request, Response } from 'express';
import * as authService from '../services/auth.service.js';

export const login = async (req: Request, res: Response) => {
    const user = await authService.login(req.body);

    res.status(200).json({
        success: true,
        message: "Login successful",
        data: user,
    });
}