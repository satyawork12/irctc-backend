import type { Request, Response } from 'express';
import * as userService from '../services/user.service.js';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();

        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve users',
        });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if(typeof id !== "string" || id === undefined || id.trim() === "") {
        res.status(400).json({
            success: false,
            message: "User ID is required",
        })
        return;
    }
    const user = await userService.getUserById(id);

    if (!user) {
        res.status(400).json({
            success: false,
            message: "User not found",
        });
        return;
    }
}