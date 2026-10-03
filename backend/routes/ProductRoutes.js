const express = require("express");
const Product = require("../models/product");
const { protect, admin } = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

const router = express.Router();

// =====================================================
// CREATE PRODUCT
// POST /api/products
// Private/Admin
// =====================================================
router.post("/", protect, admin, async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collection,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
        } = req.body;

        const product = new Product({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collection,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
            user: req.user._id,
        });

        const createdProduct = await product.save();

        res.status(201).json(createdProduct);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
});


// =====================================================
// UPDATE PRODUCT
// PUT /api/products/:id
// Private/Admin
// =====================================================
router.put("/:id", protect, admin, async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collection,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
        } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        product.name = name ?? product.name;
        product.description = description ?? product.description;
        product.price = price ?? product.price;
        product.discountPrice = discountPrice ?? product.discountPrice;
        product.countInStock = countInStock ?? product.countInStock;
        product.category = category ?? product.category;
        product.brand = brand ?? product.brand;
        product.sizes = sizes ?? product.sizes;
        product.colors = colors ?? product.colors;
        product.collection = collection ?? product.collection;
        product.material = material ?? product.material;
        product.gender = gender ?? product.gender;
        product.images = images ?? product.images;

        product.isFeatured =
            isFeatured !== undefined
                ? isFeatured
                : product.isFeatured;

        product.isPublished =
            isPublished !== undefined
                ? isPublished
                : product.isPublished;

        product.tags = tags ?? product.tags;
        product.dimensions = dimensions ?? product.dimensions;
        product.weight = weight ?? product.weight;
        product.sku = sku ?? product.sku;

        const updatedProduct = await product.save();

        res.json(updatedProduct);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
});


// =====================================================
// DELETE PRODUCT
// DELETE /api/products/:id
// Private/Admin
// =====================================================
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        await product.deleteOne();

        res.json({
            message: "Product removed",
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
});


// =====================================================
// GET ALL PRODUCTS
// GET /api/products
// Public
// =====================================================
router.get("/", async (req, res) => {
    try {
        const {
            collection,
            size,
            color,
            gender,
            minPrice,
            maxPrice,
            sortBy,
            search,
            category,
            material,
            brand,
            limit,
        } = req.query;

        let query = {};

        // Collection filter
        if (collection && collection.toLowerCase() !== "all") {
            query.collection = collection;
        }

        // Category filter
        if (category && category.toLowerCase() !== "all") {
            query.category = category;
        }

        // Material filter
        if (material) {
            query.material = {
                $in: material.split(","),
            };
        }

        // Brand filter
        if (brand) {
            query.brand = {
                $in: brand.split(","),
            };
        }

        // Size filter
        if (size) {
            query.sizes = {
                $in: size.split(","),
            };
        }

        // Color filter
        if (color) {
            query.colors = {
                $in: [color],
            };
        }

        // Gender filter
        if (gender) {
            query.gender = gender;
        }

        // Price filter
        if (minPrice || maxPrice) {
            query.price = {};

            if (minPrice) {
                query.price.$gte = Number(minPrice);
            }

            if (maxPrice) {
                query.price.$lte = Number(maxPrice);
            }
        }

        // Search filter
        if (search) {
            query.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    description: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        // Sort
        let sort = {};

        if (sortBy) {
            switch (sortBy) {
                case "priceAsc":
                    sort = {
                        price: 1,
                    };
                    break;

                case "priceDesc":
                    sort = {
                        price: -1,
                    };
                    break;

                case "popularity":
                    sort = {
                        rating: -1,
                    };
                    break;

                default:
                    break;
            }
        }

        // Get products
        const products = await Product.find(query)
            .sort(sort)
            .limit(Number(limit) || 0);

        res.json(products);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
});


// =====================================================
// BEST SELLER
// GET /api/products/best-seller
// Public
// =====================================================
router.get("/best-seller", async (req, res) => {
    try {
        const bestseller = await Product.findOne()
            .sort({ rating: -1 });

        if (!bestseller) {
            return res.status(404).json({
                message: "No best seller found",
            });
        }

        res.json(bestseller);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
});


// =====================================================
// NEW ARRIVALS
// GET /api/products/new-arrivals
// Public
// =====================================================
router.get("/new-arrivals", async (req, res) => {
    try {
        const newArrivals = await Product.find()
            .sort({ createdAt: -1 })
            .limit(400);

        res.json(newArrivals);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
});


// =====================================================
// SIMILAR PRODUCTS
// GET /api/products/similar/:id
// Public
// IMPORTANT: This route is BEFORE /:id
// =====================================================
router.get("/similar/:id", async (req, res) => {
    try {
        const { id } = req.params;

        console.log("Similar product ID:", id);

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        const similarProducts = await Product.find({
            _id: {
                $ne: id,
            },
            gender: product.gender,
            category: product.category,
        }).limit(4);

        res.json(similarProducts);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
});


// =====================================================
// GET SINGLE PRODUCT
// GET /api/products/:id
// Public
// =====================================================
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        console.log("Product ID received:", id);

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.json(product);

    } catch (error) {
        console.error("Get product error:", error);

        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        console.log("=================================");
        console.log("Product ID received:", id);
        console.log("Database:", mongoose.connection.name);
        console.log("Collection:", Product.collection.name);
        console.log("Is valid ObjectId:", mongoose.Types.ObjectId.isValid(id));

        // Check ObjectId first
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid product ID",
                receivedId: id,
            });
        }

        const product = await Product.findById(id);

        console.log("PRODUCT FOUND:", product);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                receivedId: id,
                database: mongoose.connection.name,
                collection: Product.collection.name,
            });
        }

        res.json(product);

    } catch (error) {
        console.error("Get product error:", error);

        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
});


module.exports = router;