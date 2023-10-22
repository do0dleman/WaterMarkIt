import express from 'express'
import processImage from '../use-cases/processImage'
import upload from '../config/multer'

const imageRouter = express.Router()

imageRouter.post('/',
    upload.fields([{ name: 'image', maxCount: 1 },
    { name: 'watermark', maxCount: 1 }]),
    processImage)

export default imageRouter