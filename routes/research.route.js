import express from "express"
import { getResearch, createResearch, updateResearch, deleteResearch } from "../controllers/research.controller.js"

const router = express.Router()

router.get("/", getResearch)
router.post("/create", createResearch)
router.put("/:id", updateResearch)
router.delete("/:id", deleteResearch)

export default router