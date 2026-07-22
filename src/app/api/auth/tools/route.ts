import { NextResponse, NextRequest } from "next/server";

import connectDB from "@/lib/mongodb";
import AITool from "@/models/AITool";

import User from "@/models/User";

import { authenticate } from "@/lib/apiAuth";

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const auth = authenticate(request);
        if (auth instanceof NextResponse) {
            return auth;
        }

        // Read Body
        const body = await request.json();

        const {
            name,
            company,
            description,
            category,
            pricing,
            website,
            logo,
            apiAvailable,
            rating,
            tags,
            featured,
        } = body;

        // Validate Required Fields
        if (
            !name ||
            !company ||
            !description ||
            !category ||
            !pricing ||
            !website
        ) {
            return NextResponse.json(
                {
                    message: "Please fill all required fields.",
                },
                {
                    status: 400,
                }
            );
        }

        // Check Duplicate Name
        const toolByName = await AITool.findOne({
            name: name.trim(),
        });

        if (toolByName) {
            return NextResponse.json(
                {
                    message: "Tool with this name already exists.",
                },
                {
                    status: 409,
                }
            );
        }

        // Check Duplicate Website
        const toolByWebsite = await AITool.findOne({
            website: website.trim(),
        });

        if (toolByWebsite) {
            return NextResponse.json(
                {
                    message: "Website already exists.",
                },
                {
                    status: 409,
                }
            );
        }

        // Create Tool
        const tool = await AITool.create({
            name: name.trim(),
            company: company.trim(),
            description: description.trim(),
            category,
            pricing,
            website: website.trim(),
            logo: logo || "",
            apiAvailable: apiAvailable || false,
            rating: rating ?? null,
            tags: tags || [],
            featured: featured || false,
            createdBy: auth.userId,
        });

        return NextResponse.json(
            {
                message: "AI Tool created successfully.",
                tool,
            },
            {
                status: 201,
            }
        );
    }catch (error) {
  console.error("POST /api/auth/tools Error:", error);

  return NextResponse.json(
    {
      message:
        error instanceof Error ? error.message : "Internal Server Error",
    },
    {
      status: 500,
    }
  );
}
}

import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();

    console.log("Registered Models:", mongoose.modelNames());

    const tools = await AITool.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json(tools);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}