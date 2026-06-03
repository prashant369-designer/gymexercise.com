import db from "../Db/db.js";

export const createAwards = async (req, res) => {
    const { awardName, awardDescription, awardImage, AwardCertifiedDate } = req.body;
    try{

        const [awards] = await db.query(
            "INSERT INTO awards (awardName, awardDescription, awardImage, AwardCertifiedDate) VALUES (?,?,?,?)",
            [awardName, awardDescription, awardImage, AwardCertifiedDate]
          );
          res.status(201).json({
            awards_id: awards.insertId,
            message: "awards Created Successfully"
          });

    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: "cannot create awards check log" });
    }
}

export const getAwards = async (req, res) => {
    try {
        const [awards] = await db.query("SELECT * FROM awards");
        res.status(200).json({awards,
                message: "Fetched Successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "cannot get awards check log" });
    }
}

export const deleteAwards = async (req, res) => {
    try {
        const id = req.params.id;
        const awards = await db.query("DELETE FROM awards WHERE id = ?", [id]);
        res.status(200).json({awards,
            message: "awards Deleted Successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "cannot delete awards check log" });
    }
}

export const updateAwards = async (req, res) => {
    try {
        const id = req.params.id;
        const awards = await db.query("UPDATE awards SET ? WHERE id = ?", [req.body, id]);
        res.status(200).json({awards,
            message: "awards Updated Successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "cannot update awards check log" });
    }
}