import db from "../Db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../utils/mailer.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, password } = req.body;

    if (!first_name || !last_name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await db.query(
      "INSERT INTO users (first_name, last_name, email, phone, password) VALUES (?, ?, ?, ?, ?)",
      [first_name, last_name, email, phone, hashedPassword],
    );
    await db.query(
      `INSERT INTO profiles 
        (user_id)
        VALUES (?)`,
      [user.insertId],
    );

    // send welcome mail
    const subject = "Welcome to Our Platform - Your Account is Ready!";

    const text = `Welcome! Your account has been successfully created. We're excited to have you on board. Start exploring and enjoy our services!`;

    const html = `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #4CAF50, #2ecc71); padding: 20px; text-align: center; color: white;">
        <h1 style="margin: 0;">Welcome 🎉</h1>
        <p style="margin: 5px 0 0;">We're glad you're here</p>
      </div>

      <!-- Body -->
      <div style="padding: 30px; color: #333;">
        <h2 style="margin-top: 0;">Hello 👋</h2>
        
        <p>Thank you for registering with us. Your account has been successfully created.</p>

        <p style="margin: 20px 0;">You can now explore all features and get started right away.</p>

        <!-- CTA Button -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="#" style="background-color: #4CAF50; color: #fff; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Get Started
          </a>
        </div>

        <p>If you have any questions, feel free to reach out. We're here to help!</p>

        <br/>
        <p>Cheers,<br/><b>Your Team</b></p>
      </div>

      <!-- Footer -->
      <div style="background: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #777;">
        © ${new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </div>
  </div>
`;

    await sendMail(email, subject, text, html);

    res.status(200).json({
      user_id: user.insertId,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "cannot create user check log" });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        email: user.email,
        role: user.role,
      },
      message: "Login successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "cannot get user check log" });
  }
};

//reset password
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.query(
      "UPDATE users SET password = ?, otp = NULL, otp_expiry = NULL WHERE email = ?",
      [hashedPassword, email],
    );

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Password reset failed" });
  }
};

// send otp
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    // generate OTP (6 digit)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // expiry (5 minutes)
    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    // save in DB
    await db.query("UPDATE users SET otp = ?, otp_expiry = ? WHERE email = ?", [
      otp,
      expiry,
      email,
    ]);

    // send mail
    const subject = "Password Reset OTP - Secure Access";

    const text = `Use ${otp} as your OTP to reset your password. This code will expire in 5 minutes. Do not share this code with anyone.`;

    const html = `
  <div style="font-family: Arial, sans-serif; line-height: 1.5;">
    <h2 style="color: #333;">Password Reset Verification</h2>
    <p>Hello,</p>
    <p>You requested to reset your password. Please use the OTP below to proceed:</p>
    
    <div style="font-size: 20px; font-weight: bold; margin: 10px 0; color: #2c3e50;">
      ${otp}
    </div>

    <p>This OTP is valid for <b>5 minutes</b>.</p>
    <p>If you did not request this, please ignore this email.</p>

    <br/>
    <p>Thanks,<br/>Your Team</p>
  </div>
`;

    await sendMail(email, subject, text, html);

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error sending OTP" });
  }
};

// verify otp
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (new Date() > new Date(user.otp_expiry)) {
      return res.status(400).json({ message: "OTP expired" });
    }

    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "OTP verification failed" });
  }
};

// get all users
export const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query("SELECT * FROM users");
    res.status(200).json({ users, message: "Fetched Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "cannot get users check log" });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting user with ID:", id);

    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Cannot delete user" });
  }
};

// update user role
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const [result] = await db.query(
      "UPDATE users SET role = ? WHERE id = ?",
      [role, id],
    );

    res.status(200).json({
      message: "User role updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Cannot update user role" });
  }
};

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
      pincode,
    } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const [existing] = await db.query(
      "SELECT * FROM profiles WHERE user_id = ?",
      [user_id],
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
        pincode,
      ],
    );

    res.status(201).json({
      message: "Profile created successfully",
      profileId: result.insertId,
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
  [user_id],
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
      pincode,
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
        user_id,
      ],
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

    const [result] = await db.query("DELETE FROM profiles WHERE user_id = ?", [
      user_id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
