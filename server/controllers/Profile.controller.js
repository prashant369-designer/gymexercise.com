import db from "../Db/db.js";

// Create Profile
export const createProfile = async (req, res) => {
  try {
    const {
      user_id,
      bio,
      profile_image,
      cover_image,
      address,
      gender,
      date_of_birth,
      city,
      state,
      country,
      pincode
    } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const [existing] = await db.query(
      "SELECT * FROM profiles WHERE user_id = ?",
      [user_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const [result] = await db.query(
      `INSERT INTO profiles 
      (user_id, bio, profile_image, cover_image, address, gender, date_of_birth, city, state, country, pincode)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        bio,
        profile_image,
        cover_image,
        address,
        gender,
        date_of_birth,
        city,
        state,
        country,
        pincode
      ]
    );

    res.status(201).json({
      message: "Profile created successfully",
      profileId: result.insertId
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Profile by user_id
export const getProfile = async (req, res) => {
  try {
    const { user_id } = req.params;

    const [profile] = await db.query(
      "SELECT * FROM profiles WHERE user_id = ?",
      [user_id]
    );

    if (profile.length === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile[0]);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const { user_id } = req.params;

    const {
      bio,
      profile_image,
      cover_image,
      address,
      gender,
      date_of_birth,
      city,
      state,
      country,
      pincode
    } = req.body;

    const [result] = await db.query(
      `UPDATE profiles SET
        bio = ?,
        profile_image = ?,
        cover_image = ?,
        address = ?,
        gender = ?,
        date_of_birth = ?,
        city = ?,
        state = ?,
        country = ?,
        pincode = ?
      WHERE user_id = ?`,
      [
        bio,
        profile_image,
        cover_image,
        address,
        gender,
        date_of_birth,
        city,
        state,
        country,
        pincode,
        user_id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile updated successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Delete Profile
export const deleteProfile = async (req, res) => {
  try {
    const { user_id } = req.params;

    const [result] = await db.query(
      "DELETE FROM profiles WHERE user_id = ?",
      [user_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};