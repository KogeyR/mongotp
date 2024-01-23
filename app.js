const express = require('express');
const mustacheExpress = require('mustache-express');
const connectDatabase = require('./config/database');
const annoncesRoutes = require('./routes/annonces');



// Initialiser l'application Express
const app = express();
const PORT = process.env.PORT || 3000;

// Configuration de Mustache comme moteur de template
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// Servir des fichiers statiques depuis le dossier 'public'
app.use(express.static("public"));

// Middleware pour le parsing du JSON et des données de formulaire
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à la base de données
connectDatabase();

// Configuration des routes
app.use("/", annoncesRoutes);

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

// Exporter l'application pour permettre les tests et la modularisation
module.exports = app;