import db from "../Db/db.js";

export const createcontactUs = async(req,res)=>{
    
    const { firstName,lastName,email,Phone,message} = req.body;

    try {
        const [contactUs] = await db.query(
            "INSERT INTO contactus (firstName,lastName,email,Phone,message) VALUES (?,?,?,?,?)",
            [firstName,lastName,email,Phone,message]
          );
          res.status(201).json({
            contactUs_id: contactUs.insertId,
            message: "contactUs Created Successfully"
          });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "cannot create contactUs check log" });
    }
}

export const getContactUs = async(req,res)=>{
    try {
        const [contactUs] = await db.query("SELECT * FROM contactus");
        res.status(200).json({contactUs,
            message: "contactUs Fetched Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "cannot get contactUs check log" });
    }
}

export const deleteContactUs = async(req,res)=>{
    try {
        const id = req.params.id;
        const contactUs = await db.query("DELETE FROM contactus WHERE id = ?", [id]);
        res.status(200).json({contactUs,
            message: "contactUs Deleted Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "cannot delete contactUs check log" });
    }
}