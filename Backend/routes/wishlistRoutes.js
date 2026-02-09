// Backend/routes/wishlistRoutes.js
const express = require("express");
const Wishlist = require("../models/Wishlist");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get user's wishlist
router.post("/fetch/:userid", protect, async (req, res) => {
    const { userid } = req.params;

    try {
        const wishlist = await Wishlist.findOne({ user: userid });
        if (!wishlist) {
            return res.status(404).json({ msg: "Wishlist not found" });
        }
        res.status(200).json({ success: true, data: wishlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Server Error" });
    }
});

// Add item to wishlist
router.post("/:userid/:productId", protect, async (req, res) => {
    const { userid, productId } = req.params;

    try {
        let wishlist = await Wishlist.findOne({ user: userid }) || new Wishlist({ user: userid, items: [] });

        // Check if the item already exists
        if (wishlist.items.some(item => item.productId.toString() === productId)) {
            return res.status(400).json({ msg: "Item already in wishlist" });
        }

        wishlist.items.push({ productId });
        await wishlist.save();
        res.status(201).json(wishlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
});

// Remove item from wishlist
router.delete("/:userid/:productId", protect, async (req, res) => {
    const { userid, productId } = req.params;

    try {
        const wishlist = await Wishlist.findOne({ user: userid });

        if (!wishlist) {
            return res.status(404).json({ msg: "Wishlist not found" });
        }

        wishlist.items = wishlist.items.filter(item => item.productId.toString() !== productId);
        await wishlist.save();
        res.status(200).json(wishlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
});

module.exports = router;