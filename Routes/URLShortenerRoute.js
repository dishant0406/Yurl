import express from "express";
const router = express.Router()
import { findUrlAndSend, ShortUrlandStore } from '../controllers/ShortnerController.js'

router.route('/short').post(ShortUrlandStore)
router.route('/go').post(findUrlAndSend)

export default router