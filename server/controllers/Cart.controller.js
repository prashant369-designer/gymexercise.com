import db from "../Db/db.js";

// Add to cart
export const addToCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;

    const [exists] = await db.query(
      "SELECT * FROM cart WHERE user_id=? AND product_id=?",
      [user_id, product_id]
    );

    if (exists.length > 0) {
      // update quantity
      await db.query(
        "UPDATE cart SET quantity = quantity + ? WHERE user_id=? AND product_id=?",
        [quantity || 1, user_id, product_id]
      );

      return res.json({ message: "Cart updated" });
    }

    const [result] = await db.query(
      "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
      [user_id, product_id, quantity || 1]
    );

    res.status(201).json({
      cart_id: result.insertId,
      message: "Added to cart",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Cart error" });
  }
};

// Get cart
export const getCart = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const [items] = await db.query(
      `SELECT c.id as cart_id, c.quantity, p.* 
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id=?`,
      [user_id]
    );

    const updated = items.map((item) => ({
      ...item
    }));

    res.json({ cart: updated });
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart" });
  }
};

// Update quantity
export const updateCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;

    await db.query(
      "UPDATE cart SET quantity=? WHERE user_id=? AND product_id=?",
      [quantity, user_id, product_id]
    );

    res.json({ message: "Quantity updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating cart" });
  }
};

// Remove from cart
export const removeFromCart = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    await db.query(
      "DELETE FROM cart WHERE user_id=? AND product_id=?",
      [user_id, product_id]
    );

    res.json({ message: "Removed from cart" });
  } catch (err) {
    res.status(500).json({ message: "Error removing item" });
  }
};