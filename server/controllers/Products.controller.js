import db from "../Db/db.js";

// CREATE PRODUCT
export const CreateProduct = async (req, res) => {
  try {
    const adminId = req.user.id;

    const {
      productCategory,
      productSKU,
      productInstock,
      productSize,
      productColor,
      productName,
      productDescription,
      productPurchasePrice,
      productSellingPrice,
    } = req.body;

    const productImage = req.file ? req.file.filename : null;

    const [result] = await db.query(
      `INSERT INTO products 
      (adminId, productImage, productCategory, productSKU, productInstock, productSize, productColor, productName, productDescription, productPurchasePrice, productSellingPrice) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        adminId,
        productImage,
        productCategory,
        productSKU,
        productInstock,
        productSize,
        productColor,
        productName,
        productDescription,
        productPurchasePrice,
        productSellingPrice,
      ],
    );

    res.status(201).json({
      productId: result.insertId,
      message: "Product Created Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Cannot create product" });
  }
};

//  GET ALL PRODUCTS
export const GetProduct = async (req, res) => {
  try {
    const [products] = await db.query("SELECT * FROM products");

    const updatedProducts = products.map((item) => {
      const purchase = Number(item.productPurchasePrice);
      const selling = Number(item.productSellingPrice);

      const discount = purchase - selling;
      const discountPercent = purchase
        ? ((discount / purchase) * 100).toFixed(2)
        : 0;

      return {
        ...item,
        discount,
        discountPercent,
      };
    });

    res.status(200).json({
      products: updatedProducts,
      message: "Product Fetched Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Cannot get product" });
  }
};

// get product for admin and superadmin
export const GetProductadmin = async (req, res) => {
  try {
    const adminId = req.user.id;
    const role = req.user.role;

    let query = "SELECT * FROM products";
    let values = [];

    // Agar normal admin hai → sirf apne products
    if (role !== "superadmin") {
      query = "SELECT * FROM products WHERE adminId = ?";
      values = [adminId];
    }

    const [products] = await db.query(query, values);

    //  Image fix
    const updatedProducts = products.map((item) => ({
      ...item
    }));

    res.status(200).json({
      products: updatedProducts, 
      message: "Products Fetched Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching products" });
  }
};

// GET SINGLE PRODUCT
export const GetProductWithId = async (req, res) => {
  try {
    const id = req.params.id;

    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = rows[0];

    res.status(200).json({
      product,
      message: "Product Fetched Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Cannot get product" });
  }
};

//  DELETE PRODUCT
export const DeleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    let query = "DELETE FROM products WHERE id = ?";
    let values = [id];

    if (req.user.role !== "superadmin") {
      query += " AND adminId = ?";
      values.push(req.user.id);
    }

    const [result] = await db.query(query, values);

    res.status(200).json({
      affectedRows: result.affectedRows,
      message: "Product Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Cannot delete product" });
  }
};

// UPDATE PRODUCT (SAFE)
export const UpdateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const {
      productCategory,
      productSKU,
      productInstock,
      productSize,
      productColor,
      productName,
      productDescription,
      productPurchasePrice,
      productSellingPrice,
    } = req.body;

    const productImage = req.file ? req.file.filename : null;

    let query = `UPDATE products SET 
      productCategory=?, 
      productSKU=?, 
      productInstock=?, 
      productSize=?, 
      productColor=?, 
      productName=?, 
      productDescription=?, 
      productPurchasePrice=?, 
      productSellingPrice=?,
      productImage = COALESCE(?, productImage)
      WHERE id=?`;

    let values = [
      productCategory,
      productSKU,
      productInstock,
      productSize,
      productColor,
      productName,
      productDescription,
      productPurchasePrice,
      productSellingPrice,
      productImage,
      id,
    ];

    if (req.user.role !== "superadmin") {
      query += " AND adminId = ?";
      values.push(req.user.id);
    }

    const [result] = await db.query(query, values);

    res.status(200).json({
      affectedRows: result.affectedRows,
      message: "Product Updated Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Cannot update product" });
  }
};
