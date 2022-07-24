const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        users:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
                required: true,
      },
        ],

        latestMessage: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "messages",
                required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = mongoose.models.Chat || Chat;



