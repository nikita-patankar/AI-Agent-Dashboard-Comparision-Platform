import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { authenticate } from "@/lib/apiAuth";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const auth = authenticate(request);

    if (auth instanceof NextResponse) {
      return auth;
    }

    const user = await User.findById(auth.userId).select("-password");

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const auth = authenticate(request);

    if (auth instanceof NextResponse) {
      return auth;
    }

    const { name, email, password } = await request.json();

    const existingUser = await User.findOne({
      email,
      _id: { $ne: auth.userId },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "Email already exists.",
        },
        {
          status: 409,
        }
      );
    }

    const updateData: any = {
      name,
      email,
    };

    if (password && password.trim() !== "") {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      auth.userId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}