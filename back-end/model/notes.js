const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: { 
        type: String,
        required: true,
    },
    isPrivate: {
        type: Boolean,
        default: true,
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, 
{
    timestamps: true
});

const Note = mongoose.model('Note', notesSchema);

module.exports = Note;