import bcrypt from 'bcrypt';
import { prisma } from '../config/prisma.js';
import { AppError } from '../utils/AppError.js';
import { loginInput } from '../validators/auth.validator.js';
import { createSession, revokeSession, rotateSession } from './session.service.js';
import { generateAccessToken } from '../utils/token.js';
import { refreshInput } from '../validators/refresh.validator.js';

export const login = async (data: loginInput) => {
    const user = await prisma.user.findUnique({
        where: { email: data.email }
    });

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);
    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
    }

    const { sessionId, refreshToken } = await createSession(user.id);

    const accessToken = await generateAccessToken(user.id, sessionId, user.role);

    return {
        user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
        },
        sessionId,
        accessToken,
        refreshToken,
    };
};

export const refresh = async (data:refreshInput)=>{
    const {userId, newRefreshToken} = await rotateSession(data.sessionId, data.refreshToken);

    const user = await prisma.user.findUnique({
        where : { id: userId },
        select : {
            id: true,
            role: true,
        }
    });
    if(!user){
        throw new AppError("User not found", 404);
    }
    const accessToken = await generateAccessToken(user.id, data.sessionId, user.role);
    return{
        accessToken,
        refreshToken: newRefreshToken,
        sessionId: data.sessionId,
    }
    
}

export const logout = async (sessionId: string, userId: string) => {
    await revokeSession(sessionId, userId);
}