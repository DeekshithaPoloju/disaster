require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIO = require("socket.io");
const disasterRoutes = require("./routes/disasterRoutes");
const responseRoutes = require("./routes/responseRoutes");



const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/api/disasters", disasterRoutes);
app.use("/api/responses", responseRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));

app.get("/", (req, res) => {
    res.send("Disaster Management API Running");
});

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const io = socketIO(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("send-alert", (data) => {
        io.emit("receive-alert", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});
