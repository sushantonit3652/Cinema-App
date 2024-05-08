const mongoose = require("mongoose");

const UserDetailSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String },
    country: { type: String },
  },

  {
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo", UserDetailSchema);
