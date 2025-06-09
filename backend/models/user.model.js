import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["candidate", "recruiter"], required: true },
});

export default mongoose.model("User", userSchema);
