const mongoose = require('mongoose');

const dbConexion = async () => {
    try {
        await mongoose.connect(process.env.db_url);
        console.log('Connexion à MongoDB réussir')
    } catch (error) {
        console.log('Erreur de connexion à MongoDB :', error);
    }
};

module.exports = dbConexion;
