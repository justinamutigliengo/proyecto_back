import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const collection = "Mocks";

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  pets: {
    type: [String],
    default: [],
  },
});

schema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const mockModel = mongoose.model(collection, schema);

export default mockModel;
