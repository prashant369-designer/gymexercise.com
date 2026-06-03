import db from "../Db/db.js";

// CREATE
export const createBlogs = async (req, res) => {
  try {
    const BlogImage = req.file ? req.file.filename : null;
    const { BlogHeading, BlogSubHeading, BlogComments, blogpara } = req.body;

    const [result] = await db.query(
      "INSERT INTO blog (BlogImage, BlogHeading, BlogSubHeading, BlogComments, blogpara) VALUES (?,?,?,?,?)",
      [BlogImage, BlogHeading, BlogSubHeading, BlogComments, blogpara],
    );

    res.status(201).json({
      blog_id: result.insertId,
      message: "Blog Created Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Cannot create blog" });
  }
};

// GET
export const getBlogs = async (req, res) => {
  try {
    const [blog] = await db.query("SELECT * FROM blog");

    res.status(200).json({
      blog,
      message: "Blog Fetched Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Cannot fetch blog" });
  }
};

// get by id
export const getBlogsById = async (req, res) => {
  try {
    const id = req.params.id;
    const [blog] = await db.query("SELECT * FROM blog WHERE id = ?", [id]);

    res.status(200).json({
      blog,
      message: "Blog Fetched Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Cannot fetch blog" });
  }
};

// DELETE
export const deleteBlogs = async (req, res) => {
  try {
    const id = req.params.id;

    await db.query("DELETE FROM blog WHERE id = ?", [id]);

    res.status(200).json({
      message: "Blog Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Cannot delete blog" });
  }
};

// UPDATE
export const updateBlogs = async (req, res) => {
  try {
    const id = req.params.id;
    const { BlogImage, BlogHeading, BlogSubHeading, BlogComments, blogpara } =
      req.body;

    await db.query(
      "UPDATE blog SET BlogImage=?, BlogHeading=?, BlogSubHeading=?, BlogComments=?, blogpara=? WHERE id=?",
      [BlogImage, BlogHeading, BlogSubHeading, BlogComments, blogpara, id],
    );

    res.status(200).json({
      message: "Blog Updated Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Cannot update blog" });
  }
};
