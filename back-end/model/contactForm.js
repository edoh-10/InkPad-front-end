const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
}, {
    timestamps: true,
})


const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
