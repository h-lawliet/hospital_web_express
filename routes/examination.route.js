import express from "express"
import { getExamination, getExaminationDetail, createExamination, updateExamination, deleteExamination } from "../controllers/examination.controller.js"
import { upload } from "../config/upload.js"
import { checkAuth } from "../config/checkAuth.js"

const router = express.Router()

router.get("/", getExamination)
router.get("/:id", getExaminationDetail)
router.post("/create", checkAuth, upload.single("image"), createExamination)
router.put("/:id", updateExamination)
router.delete("/:id", deleteExamination)

export default router