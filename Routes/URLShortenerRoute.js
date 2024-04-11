import express from "express";
const router = express.Router()
import { forwardToOriginalUrl, ShortUrlandStore, getAllUrls, } from '../controllers/ShortnerController.js'

router.get('/', (req, res) => {
  res.send({
    name: 'Yurl',
    version: '1.0.0',
    description: 'URL Shortner',
    time: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
  })
})

router.get('/short', ShortUrlandStore)

router.get('/:url', forwardToOriginalUrl)

router.get('/all', getAllUrls)

export default router