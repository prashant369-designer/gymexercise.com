import db from "../Db/db.js"

export const createFaq = (req, res) => {
    const { question, answer } = req.body;
    if (!question || !answer) {
        return res.status(400).json({ error: "Question and answer are required" });
    }
    try {
        db.execute(
            "INSERT INTO faq (question, answer) VALUES (?, ?)",
            [question, answer]
        );
        res.status(201).json("FAQ created successfully");
    } catch (error) {
        console.error("Error creating FAQ:", error);
        res.status(500).send("Error creating FAQ");
    }
}

export const getFaqs = async (req, res) => {
    try {
        const [faqs] = await db.execute("SELECT * FROM faq");
        res.status(200).json(faqs);
    } catch (error) {
        console.error("Error fetching FAQs:", error);
        res.status(500).json({ error: "Server error" });
    }
};

export const updateFaq = (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    if (!question || !answer) {
        return res.status(400).json({ error: "Question and answer are required" });
    }
    try {
        db.execute(
            "UPDATE faq SET question = ?, answer = ? WHERE id = ?",
            [question, answer, id]
        );
        res.status(200).json("FAQ updated successfully");
    } catch (error) {
        console.error("Error updating FAQ:", error);
        res.status(500).send("Error updating FAQ");
    }
}

export const deleteFaq = (req, res) => {
    const { id } = req.params;
    try {
        db.execute("DELETE FROM faq WHERE id = ?", [id]);
        res.status(200).json("FAQ deleted successfully");
    } catch (error) {
        console.error("Error deleting FAQ:", error);
        res.status(500).send("Error deleting FAQ");
    }
}