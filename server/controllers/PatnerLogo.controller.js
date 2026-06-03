import db from "../Db/db.js";


export const createPatnerLogo = async (req, res) => {
    try {
        const { PatnerImage ,PatnerName ,PatnerBio ,PatnerWebLink } = req.body;
        const [patner] = await db.query(
            "INSERT INTO PatnerLogo (PatnerImage ,PatnerName ,PatnerBio ,PatnerWebLink) VALUES (?,?,?,?)",
            [PatnerImage ,PatnerName ,PatnerBio ,PatnerWebLink]
        );
        res.status(201).json({
            patner_id: patner.insertId,
            message: "Patner Created Successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "cannot create patner check log" });
    }
}

export const getPatnerLogo = async (req, res) => {
    try {
        const [patner] = await db.query("SELECT * FROM PatnerLogo");
        res.status(200).json({ patner, message: "Patner Fetched Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "cannot get patner check log" });
    }
};

export const deletePatnerLogo = async (req, res) => {
    try {
        const id = req.params.id;
        const patner = await db.query("DELETE FROM PatnerLogo WHERE id = ?", [id]);
        res.status(200).json({ patner, message: "Patner Deleted Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "cannot delete patner check log" });
    }
};

export const updatePatnerLogo = async (req, res) => {
    try {
        const id = req.params.id;
        const patner = await db.query("UPDATE PatnerLogo SET ? WHERE id = ?", [req.body, id]);
        res.status(200).json({ patner, message: "Patner Updated Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "cannot update patner check log" });
    }
};

