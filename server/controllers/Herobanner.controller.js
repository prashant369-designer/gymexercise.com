import db from "../Db/db.js";

export const CreateHeroBanner = async (req, res) => {
    try {
        const { BannerHeading , BannerSubHeading , BannerDescription ,BannerImage  } = req.body;
        const check = await db.query("SELECT * FROM herobanner");
        if (check[0].length > 0) {
            return res.status(400).json({
                message: "Only one banner is allowed",
            });
        }
        const [banner] = await db.query(
            "INSERT INTO herobanner (BannerHeading , BannerSubHeading , BannerDescription ,BannerImage) VALUES (?,?,?,?)",
            [BannerHeading , BannerSubHeading , BannerDescription ,BannerImage]
        );
        res.status(201).json({
            banner_id: banner.insertId,
            message: "Banner Created Successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "cannot create banner check log" });
    }
};

export const getHeroBanner = async (req, res) => {
    try {
        const [banner] = await db.query("SELECT * FROM herobanner");
        res.status(200).json({ banner, message: "Banner Fetched Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "cannot get banner check log" });
    }
};

export const deleteHeroBanner = async (req, res) => {
    try {
        const id = req.params.id;
        const banner = await db.query("DELETE FROM herobanner WHERE id = ?", [id]);
        res.status(200).json({ banner, message: "Banner Deleted Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "cannot delete banner check log" });
    }
};

export const updateHeroBanner = async (req, res) => {
    try {
        const id = req.params.id;
        const banner = await db.query("UPDATE herobanner SET ? WHERE id = ?", [req.body, id]);
        res.status(200).json({ banner, message: "Banner Updated Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "cannot update banner check log" });
    }
};