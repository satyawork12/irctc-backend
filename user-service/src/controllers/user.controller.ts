import type { NextFunction, Request, Response } from 'express';
import * as userService from '../services/user.service.js';
import { AppError } from '../utils/AppError.js';

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
    if (typeof id !== "string" || id === undefined || id.trim() === "") {
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
    res.status(200).json({
        success: true,
        data: user,
    });
}

export const createUser = async (req: Request, res: Response) => {
    const userData = req.body;
    const newUser = await userService.createUser(userData);
    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser,
    });
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id != "string" || id === undefined || id.trim() === "") {
        throw new AppError("User ID is required", 400);
    }
    const user = await userService.updateUser(id, req.body);

    res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user,
    });

}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== "string" || id === undefined || id.trim() === "") {
        throw new AppError("User ID is required", 400);
    }
    const deletedUser = await userService.deleteUser(id);
    res.status(204).json({
        success: true,
        message: "User deleted successfully",
    })
}