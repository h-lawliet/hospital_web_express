import express from "express"
import { getExamination, getExaminationDetail, createExamination, updateExamination, deleteExamination } from "../controllers/examination.controller.js"
import { upload } from "../config/upload.js"
import { checkAuth } from "../config/checkAuth.js"

const router = express.Router()

router.get("/", getExamination)
router.get("/:id", checkAuth, getExaminationDetail)
router.post("/create", checkAuth, upload.single("image"), createExamination)
router.put("/:id", 
  checkAuth,
  (req, res, next) => {
    if (!req.file) return next()
    upload.single("image")(req, res, next)
  },  
  updateExamination)
router.delete("/:id", checkAuth, deleteExamination) 

export default router