
const mongoose = require("mongoose")

const ChatCollection = "Chat"
const ChatSchema = new mongoose.Schema({
    user: {
        type: String,
        required : true
    },
    message: {
        type: String,
        required : true
    },
    date: {
        type: Date,
        required: true,
    }

})

const chatModel = mongoose.model(ChatCollection, ChatSchema)

module.exports = chatModel;