
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/ProductRoutes");
const cartRoutes = require("./routes/cartRoute");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Server is running");
});

const PORT = process.env.PORT || 1200;

// Connect MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {

        console.log("MongoDB connected successfully");
        console.log("DATABASE NAME:", mongoose.connection.name);

        // User routes
        app.use("/api/user", userRoutes);
        app.use("/api/products", productRoutes);
        app.use("/api/cart", cartRoutes);

        // Start server
        app.listen(PORT, () => {
            console.log(
                `Server is running on http://localhost:${PORT}`
            );
        });

    })
    .catch(error => {

        console.error("MongoDB connection failed:", error);

    });

