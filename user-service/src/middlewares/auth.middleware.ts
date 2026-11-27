import type { Request, Response, NextFunction } from "express";
import { jwtVerify } from "jose";
import { env } from "../config/env.js";
import { redis } from "../config/redis.js";
import { AppError } from "../utils/AppError.js"

const secret = new TextEncoder().encode(env.ACCESS_TOKEN_SECRET);

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AppError("Authorization header missing or malformed", 401);
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            throw new AppError("Token missing", 401);
        }

        const { payload } = await jwtVerify(token, secret, {
            algorithms: ["HS256"],
        }).catch(() =>{
            throw new AppError("Invalid or expired access token", 401);
        });

        const sessionId = payload.sid;
        const userId = payload.sub;
        const role = payload.role;

        if (
            typeof userId !== "string" ||
            typeof sessionId !== "string" ||
            (role !== "USER" && role !== "ADMIN")
        ) {
            throw new AppError("Invalid access token", 401);
        }
        // Check if session is still active in Redis
        const sessionData = await redis.get(
            `session:${sessionId}`
        );

        if (!sessionData) {
            throw new AppError("Session expired or revoked", 401);
        }

        const session = JSON.parse(sessionData);
        if (session.userId !== userId) {
            throw new AppError("Invalid session", 401);
        }

        // Attach authenticated identity to request
        req.user = {
            id: userId,
            sessionId,
            role,
        };

        next();
    } catch (error) {
        next(error);
    }
};