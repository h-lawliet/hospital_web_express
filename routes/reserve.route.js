import express from "express"
import { getReserve, createReserve, deleteReserve } from "../controllers/reserve.controller.js"
import { checkAuth } from "../config/checkAuth.js"

const router = express.Router()

router.get("/", getReserve)
router.post("/create", createReserve)
router.delete("/:id", checkAuth, deleteReserve)

export default router