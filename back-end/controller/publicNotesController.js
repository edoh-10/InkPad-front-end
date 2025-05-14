const Note = require('../model/notes');


// routes pour récupérer les notes publiques
const getAllPublicNotes = async (req, res) => {
    try {
        const publicsNotes = await Note.find({isPublic: true}).populate("user");
        res.status(200).json(publicsNotes);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getOnPublicNotes = async (req, res) => {
    try{
        const OnPublicNote = await Note.findById(req.params.id).populate("user");
        res.status(200).json(OnPublicNote);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {getAllPublicNotes, getOnPublicNotes};