import db from "../Db/db.js";

export const AllUser = async (req, res) => {
  try {
    const [users] = await db.query(`
      SELECT users.*, profiles.profile_image 
      FROM users 
      LEFT JOIN profiles ON users.id = profiles.user_id
      WHERE users.role = ?
    `, ["user"]);

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    const updatedUsers = users.map(user => ({
      ...user
    }));

    res.status(200).json({
      success: true,
      count: updatedUsers.length,
      data: updatedUsers,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const AllAdmin = async (req, res) => {
  try {
    const [admins] = await db.query(`
      SELECT users.*, profiles.profile_image 
      FROM users 
      LEFT JOIN profiles ON users.id = profiles.user_id
      WHERE users.role = ?
    `, ["admin"]);

    if (admins.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No admin found",
      });
    }

    const updatedAdmins = admins.map(admin => ({
      ...admin
    }));

    res.status(200).json({
      success: true,
      count: updatedAdmins.length,
      data: updatedAdmins,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const AllProduct = async (req, res) => {
  try {
    const [products] = await db.query("SELECT * FROM products");

    const updatedProducts = products.map((product) => ({
      ...product,
    }));

    res.status(200).json({
      success: true,
      count: updatedProducts.length,
      data: updatedProducts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const LowStockProducts = async (req, res) => {
  try {
    const [products] = await db.query(
      "SELECT * FROM products WHERE productInstock < 10",
    );

    const updatedProducts = products.map((product) => ({
      ...product,
    }));

    res.status(200).json({
      success: true,
      count: updatedProducts.length,
      data: updatedProducts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const topSellingProducts = async (req, res) => {
  try {
    const [products] = await db.query(
      "SELECT * FROM products ORDER BY topSelling DESC LIMIT 5",
    );

    const updatedProducts = products.map((product) => ({
      ...product,
    }));

    res.status(200).json({
      success: true,
      count: updatedProducts.length,
      data: updatedProducts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};