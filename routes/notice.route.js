import express from "express"
import { getNotice, getNoticeDetail, createNotice, updateNotice, deleteNotice } from "../controllers/notice.controller.js"
import { upload } from "../config/upload.js"
import { checkAuth } from "../config/checkAuth.js"

const router = express.Router()

router.get("/", getNotice)
router.get("/:id", getNoticeDetail)
router.post("/create", checkAuth, upload.array("images"), createNotice)
router.put("/:id", updateNotice)
router.delete("/:id", deleteNotice)

export default router