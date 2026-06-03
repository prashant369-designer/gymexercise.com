import db from "../Db/db.js";
import sendMail from "../utils/mailer.js";

export const mailsend = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query("SELECT * FROM joiningCrud WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];
    const today = new Date();
    const expDate = new Date(user.expiring_date);

    const diffTime = expDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Skip if already notified
    if (user.notified === 1) {
      return res.json({ message: "Mail already sent" });
    }

    // SEND MAIL
    const expiredHtml = `
      <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
        <div style="max-width:500px;margin:auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.1);">
          
          <div style="background:#ef4444;padding:20px;text-align:center;">
            <h2 style="color:#fff;margin:0;">Membership Expired ❌</h2>
          </div>

          <div style="padding:20px;text-align:center;">
            <p>Hello <b>${user.name || "User"}</b>,</p>
            <p>Your membership has <b>expired</b>.</p>
            <p style="color:#666;">Expiry Date: <b>${expDate.toDateString()}</b></p>

            <a href="https://yourwebsite.com/renew"
              style="display:inline-block;margin-top:15px;padding:10px 20px;background:#ef4444;color:#fff;text-decoration:none;border-radius:5px;">
              Renew Now
            </a>
          </div>

          <div style="background:#f1f1f1;padding:10px;text-align:center;font-size:12px;color:#777;">
            © 2026 Your Company. All rights reserved.
          </div>
        </div>
      </div>
      `;

    const expiringHtml = `
      <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
        <div style="max-width:500px;margin:auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.1);">
          
          <div style="background:#f59e0b;padding:20px;text-align:center;">
            <h2 style="color:#fff;margin:0;">Membership Expiring Soon ⚠️</h2>
          </div>

          <div style="padding:20px;text-align:center;">
            <p>Hello <b>${user.name || "User"}</b>,</p>
            <p>Your membership will expire in <b>${diffDays} day(s)</b>.</p>
            <p style="color:#666;">Expiry Date: <b>${expDate.toDateString()}</b></p>

            <a href="https://yourwebsite.com/renew"
              style="display:inline-block;margin-top:15px;padding:10px 20px;background:#f59e0b;color:#fff;text-decoration:none;border-radius:5px;">
              Renew Now
            </a>
          </div>

          <div style="background:#f1f1f1;padding:10px;text-align:center;font-size:12px;color:#777;">
            © 2026 Your Company. All rights reserved.
          </div>
        </div>
      </div>
      `;

    if (diffDays < 0) {
      await sendMail(
        user.email,
        "Membership Expired ❌",
        "Your membership has expired.",
        expiredHtml,
      );

      await db.query("UPDATE joiningCrud SET notified = 1 WHERE id = ?", [
        user.id,
      ]);
    }
     else if (diffDays <= 3) {
      await sendMail(
        user.email,
        "Membership Expiring Soon ⚠️",
        `Your membership will expire in ${diffDays} day(s).`,
        expiringHtml,
      );

      await db.query("UPDATE joiningCrud SET notified = 1 WHERE id = ?", [
        user.id,
      ]);
    } else {
      return res.json({ message: "User is still active, no mail sent" });
    }

    res.json({ message: "Mail sent successfully to the user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getJoiningCrud = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM joiningCrud");
    if (rows.length === 0) {
      return res.status(404).json({ message: "joiningCrud not found" });
    }
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createJoiningCrud = async (req, res) => {
  try {
    const { name, email, phone, joining_date, expiring_date } = req.body;
    const [rows] = await db.query(
      "INSERT INTO joiningCrud (name, email,phone,joining_date,expiring_date) VALUES (?, ?, ?, ?, ?)",
      [name, email, phone, joining_date, expiring_date],
    );
    res.status(201).json({
      id: rows.insertId,
      name,
      email,
      phone,
      joining_date,
      expiring_date,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteJoiningCrud = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query("DELETE FROM joiningCrud WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "joiningCrud not found" });
    }
    res.status(200).json({ message: "joiningCrud deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateJoiningCrud = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, joining_date, expiring_date } = req.body;
    const [result] = await db.query(
      "UPDATE joiningCrud SET name = ?, email = ?,phone = ?,joining_date = ?,expiring_date = ? WHERE id = ?",
      [name, email, phone, joining_date, expiring_date, id],
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "joiningCrud not found" });
    }
    res.status(200).json({ message: "joiningCrud updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
