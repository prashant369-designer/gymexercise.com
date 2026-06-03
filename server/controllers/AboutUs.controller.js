import db from "../Db/db.js";


export const createAboutUs = async (req, res) => {
    try {
        const { AboutHeading  ,AboutDescription  ,AboutImage  ,AboutButton  } = req.body;
        const [check] = await db.query("SELECT * FROM AboutUs");
        if (check[0].length > 0) {
            return res.status(400).json({
                message: "Only one AboutUs is allowed",
            });
        }
        const [Aboutus] = await db.query(
            "INSERT INTO AboutUs (AboutHeading  ,AboutDescription  ,AboutImage  ,AboutButton) VALUES (?,?,?,?)",
            [AboutHeading  ,AboutDescription  ,AboutImage  ,AboutButton]
        );
        res.status(201).json({
            AboutUs_id: Aboutus.insertId,
            message: "AboutUs Created Successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "cannot create AboutUs check log" });
    }
}

export const getAboutUs = async (req, res) => {
    try {
        const [AboutUs] = await db.query("SELECT * FROM AboutUs");
        res.status(200).json({ AboutUs, message: "AboutUs Fetched Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "cannot get AboutUs check log" });
    }
};

export const deleteAboutUs = async (req, res) => {
    try {
        const id = req.params.id;
        const AboutUs = await db.query("DELETE FROM AboutUs WHERE id = ?", [id]);
        res.status(200).json({ AboutUs, message: "AboutUs Deleted Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "cannot delete AboutUs check log" });
    }
};

export const updateAboutUs = async (req, res) => {
    try {
        const id = req.params.id;
        const AboutUs = await db.query("UPDATE AboutUs SET ? WHERE id = ?", [req.body, id]);
        res.status(200).json({ AboutUs, message: "AboutUs Updated Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "cannot update AboutUs check log" });
    }
};

