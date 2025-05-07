import express from "express"
import { getResearch, getResearchDetail, createResearch, updateResearch, deleteResearch } from "../controllers/research.controller.js"
import { checkAuth } from "../config/checkAuth.js"

const router = express.Router()

router.get("/", getResearch)
router.get("/:id", checkAuth, getResearchDetail)
router.post("/create", checkAuth, createResearch)
router.put("/:id", checkAuth, updateResearch)
router.delete("/:id", checkAuth, deleteResearch)

export default router