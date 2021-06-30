import mongoose from "mongoose"
let required_err = "This is a mandatory field"
const userSchema = new mongoose.Schema(
  {
    username: {
        required: true,
      type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    pronouns: {
        required: true,
        type: String,
        enum: ["she", "he", "they"]
    }
  },
  {
    timestamps: true,
  }
);
// userSchema.static("findExpWithProfile", async function (id) {
//   const exp = await userSchema.findById(id).populate("profiles");
//   return post;
// });
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
