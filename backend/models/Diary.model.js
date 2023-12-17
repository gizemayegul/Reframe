const {Schema, model} = require("mongoose");

const diarySchema = new Schema (
    {
        diaryText: {type: String},
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            // required: true,
        }

    },
    {
        timestamps: true
    }
);

const Diary = model("Diary", diarySchema)

module.exports = Diary;