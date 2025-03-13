const express = require("express");
const Disaster = require("../Disaster");

const router = express.Router();

// Report a disaster
router.post("/report", async (req, res) => {
    try {
        const newDisaster = new Disaster(req.body);
        await newDisaster.save();
        res.status(201).json(newDisaster);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all disasters
router.get("/", async (req, res) => {
    try {
        const disasters = await Disaster.find();
        res.status(200).json(disasters);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
