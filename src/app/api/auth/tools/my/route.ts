import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import AITool from "@/models/AITool";
import "@/models/User";

import { authenticate } from "@/lib/apiAuth";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const auth = authenticate(request);

    if (auth instanceof NextResponse) {
      return auth;
    }

    const tools = await AITool.find({
      createdBy: auth.userId,
    })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json(tools, {
      status: 200,
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