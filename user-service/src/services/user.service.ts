import { prisma } from '../config/prisma.js';
import bcrypt from 'bcrypt';
import { CreateUserInput } from "../validators/user.validator.js";

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