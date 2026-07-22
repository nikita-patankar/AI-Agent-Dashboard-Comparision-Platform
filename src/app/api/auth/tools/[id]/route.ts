import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import AITool from "@/models/AITool";

import User from "@/models/User";


import { authenticate } from "@/lib/apiAuth";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await params;

        const tool = await AITool.findById(id)
            .populate("createdBy", "name email");

        if (!tool) {
            return NextResponse.json(
                { message: "Tool not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(tool, { status: 200 });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const auth = authenticate(request);

    if (auth instanceof NextResponse) {
      return auth;
    }

    const { id } = await params;

    const body = await request.json();

    const updatedTool = await AITool.findOneAndUpdate(
      {
        _id: id,
        createdBy: auth.userId,
      },
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTool) {
      return NextResponse.json(
        {
          message: "Tool not found or Unauthorized",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(updatedTool, {
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const auth = authenticate(request);

    if (auth instanceof NextResponse) {
      return auth;
    }

    const { id } = await params;

    const deletedTool = await AITool.findOneAndDelete({
      _id: id,
      createdBy: auth.userId,
    });

    if (!deletedTool) {
      return NextResponse.json(
        {
          message: "Tool not found or Unauthorized",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Tool deleted successfully",
      },
      {
        status: 200,
      }
    );
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