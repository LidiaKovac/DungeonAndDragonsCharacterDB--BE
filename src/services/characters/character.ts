import mongoose from "mongoose"
let required_err = "This is a mandatory field"
const charSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isIdea: {
        type: Boolean,
        required: true
    },
    moodboard: {
        type: [String],
        required: false
    },
    bg: {
        type: String,
        required: false
    }
  },
  {
    timestamps: true,
  }
);
// charSchema.static("findExpWithProfile", async function (id) {
//   const exp = await charSchema.findById(id).populate("profiles");
//   return post;
// });
const charModel = mongoose.model("Chars", charSchema);
module.exports = charModel;
