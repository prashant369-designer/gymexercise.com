import db from "../Db/db.js";

// CREATE Prizing SECTION
export const createPrizingSection = async (req, res) => {
  const { heading, subheading, para, plans } = req.body;

  try {
    const check = await db.query("SELECT * FROM pricing");

    if (check[0].length > 0) {
      return res.status(400).json({
        message: "Only one pricing plan is allowed",
      });
    }
    const [result] = await db.query(
      "INSERT INTO pricing (heading, subheading, para) VALUES (?, ?, ?)",
      [heading, subheading, para],
    );
    if (result.length === 0) {
      return res.status(400).json({
        message: "No data found",
      });
    }

    const prizeId = result.insertId;

    if (plans && plans.length > 0) {
      for (const plan of plans) {
        await db.query(
          "INSERT INTO pricing_plans (prize_id, levels, prize, PrizePerdays, Description) VALUES (?, ?, ?, ?, ?)",
          [
            prizeId,
            plan.levels,
            plan.prize,
            plan.PrizePerdays,
            plan.Description,
          ],
        );
      }
    }

    res.status(201).json({
      message: "prise section created successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// GET Prizing SECTION
export const getPriceSection = async (req, res) => {
  try {
    const [services] = await db.query("SELECT * FROM pricing LIMIT 1");

    if (services.length === 0) {
      return res.json({ message: "No data found" });
    }

    const service = services[0];

    const [plans] = await db.query(
      "SELECT levels, prize, PrizePerdays, Description FROM pricing_plans WHERE prize_id = ?",
      [service.id],
    );

    res.json({
      heading: service.Heading,
      subheading: service.SubHeading,
      para: service.Para,
      plans: plans,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// ADD Prizing PLAN
export const addPricePlan = async (req, res) => {
  const [rows] = await db.query("SELECT id FROM pricing LIMIT 1");

  if (rows.length === 0) {
    return res.status(404).json({ message: "No pricing section found" });
  }

  const prize_id = rows[0].id;
  const { levels, prize, PrizePerdays, Description } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO pricing_plans ( prize_id, levels, prize, PrizePerdays ,Description ) VALUES (?, ?, ?, ?, ?)",
      [prize_id, levels, prize, PrizePerdays, Description],
    );

    res.status(201).json({
      message: "Plan added successfully",
      planId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// DELETE Prizing PLAN
export const deletePricePlan = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM pricing_plans WHERE id = ?", [id]);

    res.json({
      message: "Plan deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// UPDATE Prizing SECTION
export const updatePriceSection = async (req, res) => {
  const { id } = req.params;
  const { heading, subheading,Para } = req.body;

  try {
    await db.query(
      "UPDATE services_section SET heading=?, subheading=?, Para=? WHERE id=?",
      [heading, subheading,Para, id],
    );

    res.json({
      message: "Service section updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//  UPDATE Prizing PLAN
export const updatePricePlan = async (req, res) => {
  const { id } = req.params;
  const { levels, prize, PrizePerdays, Description } = req.body;

  try {
    await db.query(
      "UPDATE pricing_plans SET levels=?, prize=?, PrizePerdays=?, Description=? WHERE id=?",
      [levels, prize, PrizePerdays,Description, id],
    );

    res.json({
      message: "Plan updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
