import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: JWTPayload) {
    const jwt = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(key);
    return jwt;
}

export async function decrypt(token: string) {
    try {
        const { payload } = await jwtVerify(token, key, {algorithms: ["HS256"]});
        return payload;
    } catch (error) {
        console.log(error);
    }
}

export async function getSession() {
    try {
        const session = cookies().get("session")?.value;
        if(!session) return null;
        return await decrypt(session);
        
    } catch (error) {
        console.log(error)
    }
}