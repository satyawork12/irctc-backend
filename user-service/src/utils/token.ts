import {SignJWT} from "jose";
import {env} from "../config/env.js";

const secret = new TextEncoder().encode(env.ACCESS_TOKEN_SECRET);

export const generateAccessToken = async (userId: string, sessionId: string, role: string) => {
    return new SignJWT({
        sid: sessionId,
        role,
    })
    .setProtectedHeader({alg: "HS256", })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(secret);
}