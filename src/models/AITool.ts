import mongoose, { Schema, model, models } from "mongoose";

const AIToolSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Chatbot",
        "Coding",
        "Image Generation",
        "Video",
        "Productivity",
        "Writing",
        "Research",
        "Automation",
      ],
      required: true,
    },

    pricing: {
      type: String,
      enum: ["Free", "Freemium", "Paid"],
      required: true,
    },

    website: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    logo: {
      type: String,
      default: "",
    },

    apiAvailable: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
      default: null,
      min: 1,
      max: 5,
    },

    tags: {
      type: [String],
      default: [],
    },

    featured: {
      type: Boolean,
      default: false,
    },

    views: {
      type: Number,
      default: 0,
    },

    bookmarkCount: {
      type: Number,
      default: 0,
    },

    comparisonCount: {
      type: Number,
      default: 0,
    },

    bookmarkedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.AITool || model("AITool", AIToolSchema);