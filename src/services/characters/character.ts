import mongoose from "mongoose"
const charSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    manual: {
        type: String, 
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
const charModel = mongoose.model("char", charSchema);
module.exports = charModel;
