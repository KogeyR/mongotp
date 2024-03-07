const mongoose = require("mongoose");

const annonceSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },

  prix: {
    type: Number,
    required: true,
  },

description: {
    type: String,
    required: true,
},

surface: {
    type: Number,
    required: true,
},

localisation: {
    ville:{type: String,
         required: true},

    codePostal:{type: Number,
    required: true}
},

  caracteristiques: {
    chambre:{type: Number,
        required: true},

    salleDeBain:{type: Number,
        required: false},

    balcon:{type: Boolean,
        required: false},

    jardin: {type: Boolean,
    required: false},

    parking: {type: Boolean,
    required: false}

  },
  

  
});



const Annonce = mongoose.model("Annonce", annonceSchema);

module.exports = Annonce;
