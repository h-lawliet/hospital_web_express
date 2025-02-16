import express from "express"
import { getReserve, getReserveDetail, createReserve, deleteReserve } from "../controllers/reserve.controller.js"

const router = express.Router()

router.get("/", getReserve)
router.get("/:id", getReserveDetail)
router.post("/create", createReserve)
router.delete("/:id", deleteReserve)

export default router