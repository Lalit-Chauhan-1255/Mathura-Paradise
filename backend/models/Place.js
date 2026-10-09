const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true,
            enum: ["Temple", "Heritage", "Nature"]
        },

        location: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        history: {
            type: String,
            required: true
        },

        bestTime: {
            type: String,
            required: true
        },

        image: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Place", placeSchema);