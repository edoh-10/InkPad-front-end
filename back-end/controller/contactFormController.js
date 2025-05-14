const Message = require('../model/contactForm');


// controller pour le post de message via le formulaire de contacte
const postMessage = async (req, res) => {
    try {
        console.log(req.body);
        const msg = new Message({
            name: req.body.name,
            email: req.body.email,
            content: req.body.content,
        })

        await msg.save();
        res.status(200).json({message: "message envenyé avec succès", content: msg })

    } catch (error) {
        console.error(error.message);
        res.status(500).json("une erreur s'est produite");
    }
}

module.exports = {postMessage};