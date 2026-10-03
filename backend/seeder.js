const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/product");
const User = require("./models/User");
const products = require("./data/products");
const Cart = require("./models/Cart");

dotenv.config();

const seedData = async () => {
    try {
        console.log("Connecting to MongoDB...");

        await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log("MongoDB connected successfully for seeding");

        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        const createdUser = await User.create({
            name: "Admin User",
            email: "admin@example.com",
            password: "12345",
            role: "admin",
        });

        const userID = createdUser._id;

        const sampleProducts = products.map((product) => {
            return {
                ...product,
                user: userID,
            };
        });

        await Product.insertMany(sampleProducts);

        console.log("Product data seeded successfully!");

        process.exit(0);

    } catch (error) {
        console.error("Error seeding the data:", error.message);
        process.exit(1);
    }
};

seedData();