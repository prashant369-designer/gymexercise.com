import db from "../Db/db.js";


export const createaboutus = async (req, res) => {
    try {
        const { AboutHeading  ,AboutDescription  ,AboutImage  ,AboutButton  } = req.body;
        const [check] = await db.query("SELECT * FROM aboutus");
        if (check[0].length > 0) {
            return res.status(400).json({
                message: "Only one aboutus is allowed",
            });
        }
        const [aboutus] = await db.query(
            "INSERT INTO aboutus (AboutHeading  ,AboutDescription  ,AboutImage  ,AboutButton) VALUES (?,?,?,?)",
            [AboutHeading  ,AboutDescription  ,AboutImage  ,AboutButton]
        );
        res.status(201).json({
            aboutus_id: aboutus.insertId,
            message: "aboutus Created Successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "cannot create aboutus check log" });
    }
}

export const getaboutus = async (req, res) => {
    try {
        const [aboutus] = await db.query("SELECT * FROM aboutus");
        res.status(200).json({ Aboutus, message: "aboutus Fetched Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "cannot get aboutus check log" });
    }
};

export const deleteaboutus = async (req, res) => {
    try {
        const id = req.params.id;
        const aboutus = await db.query("DELETE FROM aboutus WHERE id = ?", [id]);
        res.status(200).json({ aboutus, message: "aboutus Deleted Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "cannot delete aboutus check log" });
    }
};

export const updateaboutus = async (req, res) => {
    try {
        const id = req.params.id;
        const aboutus = await db.query("UPDATE aboutus SET ? WHERE id = ?", [req.body, id]);
        res.status(200).json({ aboutus, message: "aboutus Updated Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "cannot update aboutus check log" });
    }
};

