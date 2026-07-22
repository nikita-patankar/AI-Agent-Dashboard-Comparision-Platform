import { NextRequest } from "next/server";
import { verifyToken, JwtPayload } from "./auth";

export function authenticate(request: NextRequest): JwtPayload {
    return verifyToken(
        request.headers.get("authorization")
    );
}