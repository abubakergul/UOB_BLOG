import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide the title"],
      maxlength: [50, "title cannot be more than 50 character"],
    },
    topic: {
      type: String,
      required: [true, "Please choose the topic"],
      enum: ["IT", "Business", "Engineering", "others", "General Knowledge"],
      default: "IT",
    },
    description: {
      type: String,
      required: [true, "Please provide the title"],
      maxlength: [1000, "description cannot be more than 1000 character"],
    },
    image: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
