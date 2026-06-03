import db from "../Db/db.js";

export const createquote = async(req,res)=>{
    
    const { name,email,phone,subject,message} = req.body;

    try {
        const [quote] = await db.query(
            "INSERT INTO quotes (name,email,phone,subject,message) VALUES (?,?,?,?,?)",
            [name,email,phone,subject,message]
          );
          res.status(201).json({
            quote_id: quote.insertId,
            message: "quote Created Successfully"
          });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "cannot create quote check log" });
    }
}

export const getquote = async(req,res)=>{
    try {
        const [quote] = await db.query("SELECT * FROM quotes");
        res.status(200).json({quote,
            message: "quote Fetched Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "cannot get quote check log" });
    }
}

export const deletequote = async(req,res)=>{
    try {
        const id = req.params.id;
        const  quote = await db.query("DELETE FROM quotes WHERE id = ?", [id]);
        res.status(200).json({quote,
            message: "quote Deleted Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "cannot delete quote check log" });
    }
}