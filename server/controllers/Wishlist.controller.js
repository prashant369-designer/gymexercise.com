import db from "../Db/db.js";

// Add to Wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    if (!user_id || !product_id) {
      return res.status(400).json({ message: "user_id & product_id required" });
    }

    // Check if already exists
    const [exists] = await db.query(
      "SELECT * FROM wishlist WHERE user_id=? AND product_id=?",
      [user_id, product_id]
    );

    if (exists.length > 0) {
      return res.status(409).json({ message: "Already in wishlist" });
    }

    const [result] = await db.query(
      "INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)",
      [user_id, product_id]
    );

    res.status(201).json({
      wishlist_id: result.insertId,
      message: "Added to wishlist",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error adding to wishlist" });
  }
};

// Get User Wishlist
export const getWishlist = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const [items] = await db.query(
      `SELECT w.id as wishlist_id, p.* 
       FROM wishlist w
       JOIN products p ON w.product_id = p.id
       WHERE w.user_id = ?`,
      [user_id]
    );

    const updatedItems = items.map((item) => ({
      ...item,
    }));

    res.status(200).json({
      wishlist: updatedItems,
      message: "Wishlist fetched successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching wishlist" });
  }
};

// REMOVE FROM WISHLIST
export const removeFromWishlist = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    const [result] = await db.query(
      "DELETE FROM wishlist WHERE user_id=? AND product_id=?",
      [user_id, product_id]
    );

    res.status(200).json({
      affectedRows: result.affectedRows,
      message: "Removed from wishlist",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error removing from wishlist" });
  }
};