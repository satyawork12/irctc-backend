import { prisma } from '../config/prisma.js';
import bcrypt from 'bcrypt';
import type { CreateUserInput, UpdateUserInput } from "../validators/user.validator.js";
import { AppError } from '../utils/AppError.js';
import { Prisma } from '../../generated/prisma/client.js';


export const getAllUsers = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            role: true,
            createdAt: true,
        },
    });
};

export const getUserById = async (id: string) => {
    return await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            role: true,
            createdAt: true,
        }
    })
}

export const createUser = async (userData: CreateUserInput) => {
    const passwordHash = await bcrypt.hash(userData.password, 12);
    try {
        const user = await prisma.user.create({
            data: {
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                phoneNumber: userData.phoneNumber,
                passwordHash,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phoneNumber: true,
                role: true,
                createdAt: true,
            }
        })
        return user;
    }
    catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            throw new AppError("Email or phone number already exists", 409);
        }

        throw error;
    }
}

export const updateUser = async (id: string, data: UpdateUserInput) => {
    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phoneNumber: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            }
        })
        return updatedUser;
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                throw new AppError("User not found", 404);
            }
            if (error.code === "P2002") {
                throw new AppError("Email or phone number already exists", 409);
            }
        }
        throw error;
    }
}


export const deleteUser = async (id: string) => {
    try {
        const deletedUser = await prisma.user.delete({
            where: { id },
        })
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            throw new AppError("User not found", 404);
        }
        throw error;
    }
}