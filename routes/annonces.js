const express = require("express");
const router = express.Router();
const Annonce = require("../models/Annonce");


router.post("/annonces", async (req, res) => {
    try {
        const { titre, description, prix, balcon, jardin, ville, codePostal, surface, chambre, salleDeBain, parking } = req.body;

        if (!titre || !description || !prix || !ville || !codePostal || !surface || !chambre || !salleDeBain || !parking) {
            return res.status(400).json({ message: 'Les champs titre, description, prix, ville, codePostal, surface, chambre, salleDeBain et parking sont obligatoires' });
        }

        const balconBool = balcon === "true";
        const jardinBool = jardin === "true";

        const nouvelleAnnonce = new Annonce({
            titre,
            description,
            prix,
            surface,
            localisation: { ville, codePostal },
            caracteristiques: { balcon: balconBool, jardin: jardinBool, chambre, salleDeBain, parking }
        });

        const annonceCreee = await nouvelleAnnonce.save();
        res.status(201).json({ message: 'Annonce créée avec succès', annonce: annonceCreee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'annonce' });
    }
});


router.get("/annonces", async (req, res) => {
    try {
        const annonces = await Annonce.find({});
        res.render("listeAnnonces", { annonces: annonces });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur est survenue" });
    }
});


 router.get("/annonces/:id", async (req, res) => {
     try {
         const annonce = await Annonce.findById(req.params.id);
         if (!annonce) {
             return res.status(404).json({ message: 'Annonce non trouvée' });
         }
         res.json(annonce);
     } catch (error) {
         console.error(error);
         res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des détails de l\'annonce' });
     }
 });


 router.put("/annonces/:id", async (req, res) => {
     try {
         const annonce = await Annonce.findByIdAndUpdate(req.params.id, req.body, { new: true });
         if (!annonce) {
             return res.status(404).json({ message: 'Annonce non trouvée' });
         }
         res.json(annonce);
     } catch (error) {
         console.error(error);
         res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de l\'annonce' });
     }
 });


 router.delete("/annonces/:id", async (req, res) => {
     try {
         const annonce = await Annonce.findByIdAndDelete(req.params.id);
         if (!annonce) {
             return res.status(404).json({ message: 'Annonce non trouvée' });
         }
         res.json({ message: 'Annonce supprimée avec succès' });
     } catch (error) {
         console.error(error);
         res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de l\'annonce' });
     }
 });

module.exports = router;
