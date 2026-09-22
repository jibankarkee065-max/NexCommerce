
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfully");

      //API Routes
      app.use("/api/users",userRoutes);



    app.listen(process.env.PORT || 12001, () => {
      console.log(
        `Server is running on http://localhost:${process.env.PORT || 12001}`
      );
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed.", error);
  });

