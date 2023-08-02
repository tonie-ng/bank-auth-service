import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, expireAfterSeconds: 7200 }
);

export const Token = mongoose.model("Token", TokenSchema);
