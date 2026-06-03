import express from "express";
const router = express.Router();
import { getJoiningCrud,createJoiningCrud,deleteJoiningCrud,updateJoiningCrud ,mailsend} from "../controllers/JoiningCrud.controller.js";

router.get("/", getJoiningCrud);
router.post("/", createJoiningCrud);
router.delete("/:id", deleteJoiningCrud);
router.put("/:id", updateJoiningCrud);
router.post("/sendmail/:id", mailsend);

export default router;