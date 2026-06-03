import db from "../Db/db.js";

// GET Gallery
export const getGallery = async (req, res) => {
  try {
    const [gallery] = await db.query("SELECT * FROM gallery");

    res.status(200).json({
      success: true,
      message: "Gallery data retrieved successfully",
      data: gallery
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};


// CREATE Gallery
export const createGallery = async (req, res) => {
  try {
    const { galleryimage, gallerytitle, gallerypara } = req.body;

    const [result] = await db.query(
      "INSERT INTO gallery (galleryimage, gallerytitle, gallerypara) VALUES (?, ?, ?)",
      [galleryimage, gallerytitle, gallerypara]
    );

    res.status(201).json({
      success: true,
      message: "Gallery created successfully",
      insertId: result.insertId
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};