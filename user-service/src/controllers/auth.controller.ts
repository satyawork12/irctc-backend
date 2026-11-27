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

export const refresh = async (req: Request, res: Response) => {
    const tokens = await authService.refresh(req.body);

    res.status(200).json({  
        success: true,
        message: "Token refreshed successfully",
        data: tokens,
    });
}

export const logout = async (req: Request, res: Response) => {  
    await authService.logout(req.user!.sessionId, req.user!.id);
    res.status(200).json({
        success: true,
        message: "Logout successful",
    });
}