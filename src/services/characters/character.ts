const { Schema, model } = require("mongoose");
let required_err = "This is a mandatory field"
const charSchema = new Schema(
  {
    name: {
      type: String,
      required: required_err,
    },
    isIdea: {
        type: Boolean,
        required: required_err
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
