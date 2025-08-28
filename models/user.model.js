import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true, 
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
    },
    phoneNumber: {
      type: Number,
      required: true
    },
    role: {
      type: String,
      enum: ["admin", "user"], 
      default: "user"
    },
    password:{
      type:String,
      required:true
    }
  },
  {
    timestamps: true 
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
