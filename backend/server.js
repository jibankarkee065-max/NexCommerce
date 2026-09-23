const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Server is running");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected successfully");
        console.log("DATABASE NAME:", mongoose.connection.name);

        app.use("/api/user", userRoutes);

        app.listen(process.env.PORT || 12001, () => {
            console.log(`Server is running on http://localhost:${process.env.PORT || 12001}`);
        });
    })
    .catch(error => console.error("MongoDB connection failed:", error));