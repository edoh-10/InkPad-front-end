require('dotenv').config();
const express = require('express');
const crudRoutes = require('./routes/crudsRoutes');
const dbConexion = require('./database/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoute');
const publicRoutes = require('./routes/publicNotesRoutes')
const adminRoutes = require('./routes/adminRoute');
const contactRoute = require('./routes/contactFormRoute');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const path = require('path');

// initialisation de app
const app = express();

// Connexion à la base de donnée
dbConexion();

cloudinary.config({
    cloud_name:process.env.Cloudinary_cloud_name,
    api_key: process.env.Cloudinary_api_key,
    api_secret: process.env.Cloudinary_api_secret,
})

// les middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, "../front-end/build")));

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../front-end/build", "index.html"));
// });

// déclaration du port
const port = process.env.port;


// les end point
app.use("/api", crudRoutes);
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", publicRoutes);
app.use("/api", adminRoutes);
app.use("/api", contactRoute);


app.listen(port, () => {
    console.log(`server démarrer sur le port ${port} à l'addres http://localhost:${port}`);
});