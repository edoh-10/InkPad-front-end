const Note = require('../model/notes');
const User = require('../model/User');

// route pour récupérer toutes les notes
const allNotes = async (req, res) => {
    try {
        const allNotes = await Note.find();
        res.status(200).json(allNotes)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// route pour récupérer une seule note
const oneNote = async (req, res) => {
    try {
        const getOne = await Note.findOne({title: req.params.id});
        // console.log(getOne);
        if(!getOne){
           return res.status(404).json({message: "Note non trouvé"});
        }
        console.log(getOne);
        return res.status(200).json(getOne)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
};

// route pour la création d'une note
const createANote = async (req, res) => {
    try {
        console.log('Request user (si authentification):', req.user);
        const creerNote = new Note({
            title: req.body.title,
            content: req.body.content,
            isPrivate: req.body.isPrivate,
            isPublic: req.body.isPublic,
            user: req.user.userId,
        });
        const userId = req.user?.userId;
        if (!userId) { 
            return res.status(400).json({ error: "Utilisateur non identifié" });
        }


        await creerNote.save();

        await User.findByIdAndUpdate(req.user.userId, { $push: { notes: creerNote._id } });

        res.status(200).json(creerNote)
    } catch (error) {
        console.log('Erreur', error);
    }
}

// route pour changer une note
const changeNote = async (req, res) => {
    try {
        const chageNoteId = req.params.id;
        const {title, content} = req.body;

        const newNote = await Note.findOneAndUpdate(
            {_id: chageNoteId},
            {title, content},
            {new: true}
        );

        if(!newNote) {
            return res.status(400).json({message : "Note nonn trouvé ou accès refusé"})
        };
        
        res.status(200).json(newNote);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// route pour supprimer une note 
const deleteNote = async (req, res) => {
    try {
        const deleteNote = await Note.findByIdAndDelete(req.params.id);

        if(!deleteNote){
            res.status(404).json({message: "Note non trouvé"});
        }

        res.status(200).json(deleteNote);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {allNotes, oneNote, createANote, changeNote, deleteNote}