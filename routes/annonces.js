const express = require("express");
const mustacheExpress = require("mustache-express");
const app = express();
const database = require("../config/database");
const router = express.Router();

// router.get('/', (req, res) => {
//   res.render('index', { message: "Bienvenue sur notre site d'annonces " });
// });

const Annonce = require("../models/Annonce");


router.post('/', async (req, res) => {
    try {
        const { titre, description, prix, balcon, jardin, ville, codePostal } = req.body;

        if (!titre || !description || !prix || !ville || !codePostal) {
            return res.status(400).json({ message: 'Les champs titre, description, prix, ville et codePostal sont obligatoires' });
        }

        const balconBool = balcon === "true";
        const jardinBool = jardin === "true";

        const nouvelleAnnonce = new Annonce({
            titre,
            description,
            prix,
            localisation: { ville, codePostal },
            balcon: balconBool,
            jardin: jardinBool,
        });

        nouvelleAnnonce.save()
            .then((annonceCreee) => {
                res.status(201).json({ message: 'Objet enregistré !', annonce: annonceCreee });
            })
            .catch((error) => {
                console.error(error);
                res.status(400).json({ error: error.message });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'annonce' });
    }
});

module.exports = router;
