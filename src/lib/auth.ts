import jwt from "jsonwebtoken";

export interface JwtPayload {
    userId: string;
    email: string;
}

export function verifyToken(authHeader: string | null): JwtPayload {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("Unauthorized");
    }

    const token = authHeader.split(" ")[1];

    return jwt.verify(
        token,
        process.env.JWT_SECRET!
    ) as JwtPayload;
}