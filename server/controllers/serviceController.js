import db from "../Db/db.js";

// CREATE SERVICE SECTION
export const createServiceSection = async (req, res) => {
  const { heading, subheading, plans } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO services_section (heading, subheading) VALUES (?, ?)",
      [heading, subheading]
    );

    const serviceId = result.insertId;

    if (plans && plans.length > 0) {
      for (const plan of plans) {
        await db.query(
          "INSERT INTO service_plans (service_id, title, icon, description) VALUES (?, ?, ?, ?)",
          [serviceId, plan.title, plan.icon, plan.description]
        );
      }
    }

    res.status(201).json({
      message: "Service section created successfully"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
 
// GET SERVICE SECTION
export const getServiceSection = async (req, res) => {
  try {

    const [services] = await db.query("SELECT * FROM services_section LIMIT 1");

    if (services.length === 0) {
      return res.json({ message: "No data found" });
    }

    const service = services[0];

    const [plans] = await db.query(
      "SELECT title, icon, description FROM service_plans WHERE service_id = ?",
      [service.id]
    );

    res.json({
      heading: service.heading,
      subheading: service.subheading,
      plans: plans
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// ADD SERVICE PLAN
export const addServicePlan = async (req, res) => {
  const { service_id, title, icon, description } = req.body;

  try {

    const [result] = await db.query(
      "INSERT INTO service_plans (service_id, title, icon, description) VALUES (?, ?, ?, ?)",
      [service_id, title, icon, description]
    );

    res.status(201).json({
      message: "Plan added successfully",
      planId: result.insertId
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// DELETE SERVICE PLAN
export const deleteServicePlan = async (req, res) => {
  const { id } = req.params;

  try {

    await db.query(
      "DELETE FROM service_plans WHERE id = ?",
      [id]
    );

    res.json({
      message: "Plan deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// UPDATE SERVICE SECTION
export const updateServiceSection = async (req, res) => {

  const { id } = req.params;
  const { heading, subheading } = req.body;

  try {

    await db.query(
      "UPDATE services_section SET heading=?, subheading=? WHERE id=?",
      [heading, subheading, id]
    );

    res.json({
      message: "Service section updated successfully"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

//  UPDATE SERVICE PLAN
export const updateServicePlan = async (req, res) => {

  const { id } = req.params;
  const { title, icon, description } = req.body;

  try {

    await db.query(
      "UPDATE service_plans SET title=?, icon=?, description=? WHERE id=?",
      [title, icon, description, id]
    );

    res.json({
      message: "Plan updated successfully"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};