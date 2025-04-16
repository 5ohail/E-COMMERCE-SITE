import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 4,
    unique: true,
    required: true
  },
  email: {
    type: String,
    minLength: 10,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minLength: 6,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare passwords for login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
