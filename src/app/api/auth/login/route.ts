import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: Request) {
    try {
        await connectDB();

        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                {
                    message: "Email and Password are required",
                },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                {
                    message: "Email not registered",
                },
                {
                    status: 401,
                }
            );
        }

        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatch) {
            return NextResponse.json(
                {
                    message: "Invalid Password",
                },
                {
                    status: 401,
                }
            );
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "7d",
            }
        );

        return NextResponse.json({
            message: "Login Successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                message: "Internal Server Error",
            },
            {
                status: 500,
            }
        );
    }
}