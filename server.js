require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

// Define Disaster Schema
const disasterSchema = new mongoose.Schema({
    Disaster_ID: Number,
    Type: String,
    Location: String,
    Severity: String,
    Timestamp: String,
    Reported_By: String,
    Status: String
});

const disaster = mongoose.model("disaster", disasterSchema);


// API Route to Get All Disasters
app.get("/api/disaster", async (req, res) => {
    try {
        const disasters = await Disaster.find();
        res.json(disasters);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
