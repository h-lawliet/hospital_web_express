import express from "express"
import { getNotice, getNoticeDetail, getActiveNotice, createNotice, updateNotice, deleteNotice, deletePic } from "../controllers/notice.controller.js"
import { upload } from "../config/upload.js"
import { checkAuth } from "../config/checkAuth.js"

const router = express.Router()

router.get("/", getNotice)
router.get("/:id", getNoticeDetail)
router.get("/status/active", getActiveNotice)
router.post("/create", checkAuth, upload.array("images"), createNotice)
router.put("/:id", checkAuth, upload.array("images"), updateNotice)
router.delete("/:id", checkAuth, deleteNotice)
router.post("/deletePic/:id", checkAuth, deletePic)

export default router