import {randomBytes, randomUUID, createHash} from "node:crypto";
import { redis } from "../config/redis.js";
import { AppError } from "../utils/AppError.js";

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

export const createSession = async (userId: string) => {
    const sessionId = randomUUID();
    
    const refreshToken = randomBytes(32).toString("hex");
    const refreshTokenHash = hashToken(refreshToken); 

    const session = {
        userId,
        refreshTokenHash,
        createdAt: new Date().toISOString(),
    }
    await redis.set(`session:${sessionId}`, JSON.stringify(session), {
        EX: SESSION_TTL_SECONDS,
    });

    return {
        sessionId,
        refreshToken,
    }

}

export const rotateSession = async (sessionId: string, refreshToken: string) => { 
    const key = `session:${sessionId}`;
    const sessionData = await redis.get(key);

    if (!sessionData) {
        throw new AppError("Session expired or invalid", 401);
    }

    const session = JSON.parse(sessionData);

    const incomingRefreshTokenHash = hashToken(refreshToken);

    if (incomingRefreshTokenHash !== session.refreshTokenHash) {    
        throw new AppError("Invalid refresh token", 401);
    }
    const newRefreshToken = randomBytes(32).toString("hex");
    session.refreshTokenHash = hashToken(newRefreshToken);      
    await redis.set(key, JSON.stringify(session), {
        EX: SESSION_TTL_SECONDS,      
    });

    return {
        userId: session.userId,
        newRefreshToken,
    }
};

export const revokeSession = async (sessionId: string, userId:string) => {
    const key = `session:${sessionId}`;
    const sessionData = await redis.get(key);
    if (!sessionData) {
        throw new AppError("Session expired or invalid", 401);
    }

    const session = JSON.parse(sessionData);
    if(userId !== session.userId){
        throw new AppError("Unauthorized to revoke this session", 403);
    }
    await redis.del(key);
}