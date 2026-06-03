import db from "../Db/db.js";

export const createMentor = async (req, res) => {
    const { mentorName ,mentorBio ,mentorExperties ,mentorImage ,mentorFacebook ,mentorInsta ,mentorYoutube  } = req.body;

    try {
        const [teams] = await db.query(
            "INSERT INTO Teams (mentorName ,mentorBio ,mentorExperties ,mentorImage ,mentorFacebook ,mentorInsta ,mentorYoutube) VALUES (?,?,?,?,?,?,?)",
            [mentorName ,mentorBio ,mentorExperties ,mentorImage ,mentorFacebook ,mentorInsta ,mentorYoutube]
        );
        res.status(201).json({
            teams_id: teams.insertId,
            message: "teams Created Successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "cannot create teams check log" });
    }
}

export const getMentors = async (req, res) => {
    try {
        const [mentor] = await db.query("SELECT * FROM Teams");
        res.status(200).json({mentor,
                message: "Fetched Successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "cannot get awards check log" });
    }
}

export const deleteMentors = async (req, res) => {
    try {
        const id = req.params.id;
        const mentors = await db.query("DELETE FROM Teams WHERE id = ?", [id]);
        res.status(200).json({mentors,
            message: "mentors Deleted Successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "cannot delete mentors check log" });
    }
}

export const updateMentors = async(req,res)=>{
    try {
        const id = req.params.id;
        const mentors = await db.query("UPDATE Teams SET ? WHERE id = ?", [req.body, id]);
        res.status(200).json({mentors,
            message: "mentors Updated Successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "cannot update mentors check log" });
    }
}