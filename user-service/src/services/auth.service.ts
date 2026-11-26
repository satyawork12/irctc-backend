import bcrypt from 'bcrypt';
import {prisma} from '../config/prisma.js';
import {AppError} from '../utils/AppError.js';
import { loginInput } from '../validators/auth.validator.js';

export const login = async (data: loginInput)=>{
    const user = await prisma.user.findUnique({
        where:{email: data.email}
    });

    if(!user){
        throw new AppError("Invalid email or password", 401);
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);
    if(!isPasswordValid){
        throw new AppError("Invalid email or password", 401);
    }
    return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
    }
}