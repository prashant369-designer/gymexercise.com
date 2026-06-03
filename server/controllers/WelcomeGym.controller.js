import db from "../Db/db.js";

export const createPricingPlan = async (req, res) => {
  const { heading, subheading, description, leftImage, rightImage, brandLogos } = req.body;

  try {
    const check = await db.query("SELECT * FROM welcomegym");

    if (check[0].length > 0) {
      return res.status(400).json({
        message: "Only one pricing plan is allowed"
      });
    }

    const result = await db.query(
      `INSERT INTO welcomegym 
      (heading, subheading, description, leftImage, rightImage, brandLogos) 
      VALUES (?,?,?,?,?,?)`,
      [heading, subheading, description, leftImage, rightImage, JSON.stringify(brandLogos)]
    );

    res.status(201).json({
      message: "welcome gym fields Created",
      data: result
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPricingPlan = async (req, res) => {
  try {

    const result = await db.query("SELECT * FROM welcomegym");

    res.status(200).json({
      data: result[0]
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePricingPlan = async (req, res) => {
  const { id } = req.params;
  const { heading, subheading, description, leftImage, rightImage, brandLogos } = req.body;

  try {

    const result = await db.query(
      `UPDATE welcomegym 
      SET heading=?, subheading=?, description=?, leftImage=?, rightImage=?, brandLogos=? 
      WHERE id=?`,
      [heading, subheading, description, leftImage, rightImage, JSON.stringify(brandLogos), id]
    );

    res.status(200).json({
      message: "Pricing Plan Updated",
      data: result
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePricingPlan = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM welcomegym WHERE id=?", [id]);

    res.status(200).json({
      message: "Pricing Plan Deleted"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};