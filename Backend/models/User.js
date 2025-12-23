import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

/*
  User Schema
  Defines the structure of a user document in MongoDB
*/
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "No name provided"],
    trim: true,          // Remove leading/trailing spaces
    unique: true,        // Ensure usernames are unique
  },

  email: {
    type: String,
    required: [true, "No email provided"],
    unique: true,        // Prevent duplicate email registrations
    match: [
      // Email format validation regex
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },

  password: {
    type: String,
    required: [true, "No password provided"], // Stored as a hashed value
  },

  bio: {
    type: String,
    default: "Just a traveler exploring the world one pin at a time.",
    maxlength: 150,      // Limit bio length for UI consistency
  },

  avatarColor: {
    type: String,
    default: "#f28b50",  // Default profile avatar color
  },

  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",       // Reference to other User documents
    },
  ],
});

/*
  Pre-save Middleware
  - Hashes the password before saving the user
  - Runs only if the password field was modified
*/
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

/*
  Instance Method
  - Generates a signed JWT for authentication
  - Token expires in 30 days
*/
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userID: this._id, username: this.username },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

// Export User model
export default mongoose.model("User", UserSchema);
