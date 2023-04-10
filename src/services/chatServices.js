const chatModel = require("../models/chatModel");


class ChatManager {
    
    async getMessages() {
        try {
            const messages = await chatModel.find({})
            return messages

        } catch (error) {
            console.log(error.message);
        }
    }

    async addMessage(user, message){
    try {
        const insert = {
            user : user,
            message: message,
            date : new Date()
        }
        const newMessage = await chatModel.create(insert)
        return newMessage
        
    } catch (error) {
        console.log(error.message);
    }
    }
}

module.exports = ChatManager