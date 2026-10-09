const express = require("express");
const Place = require("../models/Place");

const router = express.Router();

// Get all places
router.get("/", async (req, res) => {
    try {
        const places = await Place.find().sort({ category: 1, name: 1 });

        res.json(places);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch places"
        });
    }
});

// Get places by category
router.get("/category/:category", async (req, res) => {
    try {
        const category = req.params.category;

        const places = await Place.find({
            category: {
                $regex: `^${category}$`,
                $options: "i"
            }
        });

        res.json(places);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch category"
        });
    }
});

// Get one place
router.get("/:id", async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);

        if (!place) {
            return res.status(404).json({
                message: "Place not found"
            });
        }

        res.json(place);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch place"
        });
    }
});

module.exports = router;