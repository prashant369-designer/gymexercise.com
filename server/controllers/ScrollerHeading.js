import db from "../Db/db.js"

// post
export const createScroller = async (req, res) => {
  const { heading } = req.body;

  try {
    const [scroller] = await db.query(
      "INSERT INTO scroller_heading (heading) VALUE (?)",
      [heading]
    );

    res.status(201).json({
      scroller_id: heading.insertId,
      message: "Scroller Created Successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "cannot create scroller check log" });
  }
};

// get
export const getScroller = async (req, res) => {
  try {
    const [scroller] = await db.query("SELECT * FROM scroller_heading");
    res.status(200).json({scroller,
        message: "Fetched Successfully"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "cannot get Scroller check log" });
  }
}

// delete
export const deleteScroller = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await db.query("DELETE FROM scroller_heading WHERE id = ?", [id]);
    res.status(200).json({blog,
        message: "Blog Deleted Successfully"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "cannot delete blog check log" });
  }
}

// update
export const updateScroller = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await db.query("UPDATE scroller_heading SET ? WHERE id = ?", [req.body, id]);
    res.status(200).json({blog,
        message: "Blog Updated Successfully"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "cannot update blog check log" });
  }
}
