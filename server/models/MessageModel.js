const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        sender:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
      },

        message: {
            type: String,
            required: true,
        },

        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "chats",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const message = mongoose.model("messages", messageSchema);
module.exports = message;