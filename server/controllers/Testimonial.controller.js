import db from "../Db/db.js";

export const createTestimonial = async (req, res) => {
    const { name, Para, image, profession } = req.body;
    try{

        const [testimonial] = await db.query(
            "INSERT INTO testimonial (name, Para, image, profession) VALUES (?,?,?,?)",
            [name, Para, image, profession]
          );
          res.status(201).json({
            testimonial_id: testimonial.insertId,
            message: "testimonial Created Successfully"
          });

    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: "cannot create testimonial check log" });
    }
};

export const getTestimonials = async (req, res) => {
    try{
        const [testimonial] = await db.query("SELECT * FROM testimonial");
        res.status(200).json({testimonial,
            message: "testimonial Fetched Successfully"
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: "cannot get testimonial check log" });
    }
};

export const deleteTestimonial = async (req, res) => {
    try{
        const id = req.params.id;
        const testimonial = await db.query("DELETE FROM testimonial WHERE id = ?", [id]);
        res.status(200).json({testimonial,
            message: "testimonial Deleted Successfully"
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: "cannot delete testimonial check log" });
    }
};

export const updateTestimonial = async (req, res) => {
    try{
        const id = req.params.id;
        const testimonial = await db.query("UPDATE testimonial SET ? WHERE id = ?", [req.body, id]);
        res.status(200).json({testimonial,
            message: "testimonial Updated Successfully"
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: "cannot update testimonial check log" });
    }
};