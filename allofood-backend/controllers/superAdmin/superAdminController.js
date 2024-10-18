const Restaurant = require("../../models/restaurantModel");
const mongoose = require("mongoose");

// Ajouter un nouveau restaurant
exports.addRestaurant = async (req, res) => {
  try {
    // Use the actual SuperAdmin ID
    const superAdminId = "6712227016522097b4a45080"; 

    // Destructure necessary fields from the request body
    const { user, name, description, images, address, phone, status, isApproved } = req.body;

    // Check if the user making the request is the SuperAdmin
    if (user !== superAdminId) {
      return res.status(403).json({ message: "Accès interdit. Vous n'êtes pas autorisé à ajouter des restaurants." });
    }

    // Create a new restaurant
    const newRestaurant = new Restaurant({
      name,
      description,
      user,
      images,
      address,
      phone,
      status,
      isApproved
    });

    // Save the restaurant to the database
    await newRestaurant.save();

    // Respond with the created restaurant information
    res.status(201).json({ message: "Restaurant ajouté avec succès.", restaurant: newRestaurant });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: "Données invalides.", errors: error.errors });
    }
    console.error("Erreur lors de l'ajout du restaurant:", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};
