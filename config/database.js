const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const connectionString ='mongodb+srv://kogey:g404@kogey.amoojjn.mongodb.net/?retryWrites=true&w=majority';

    await mongoose.connect(connectionString, {
    });

    console.log("Connecter à la Db");
  } catch (error) {
    console.error("erreur de connexion à la Db", error.message);

    throw error;
  }
};

module.exports = connectDatabase;
