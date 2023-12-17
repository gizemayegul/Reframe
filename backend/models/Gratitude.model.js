const { Schema, model } = require("mongoose");

const gratitudeSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    gratitudeText: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Gratitude = model("Gratitude", gratitudeSchema);

module.exports = Gratitude;
