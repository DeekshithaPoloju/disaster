const express = require("express");
const EmergencyResponse = require("../EmergencyResponse");

const router = express.Router();

// Assign emergency response
router.post("/assign", async (req, res) => {
    try {
        const newResponse = new EmergencyResponse(req.body);
        await newResponse.save();
        res.status(201).json(newResponse);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all emergency responses
router.get("/", async (req, res) => {
    try {
        const responses = await EmergencyResponse.find().populate("disasterId");
        res.status(200).json(responses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
