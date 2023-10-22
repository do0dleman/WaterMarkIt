import { NextFunction, Request, Response } from "express";
import Jimp from 'jimp'
import asyncHandler from 'express-async-handler'

import { Multer } from 'multer'; // vscode shows an error without it but it do compile without it

/**
 * @description adds a watermark to an image
 * @method POST
 * @access public
 */
const processImage = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const files = req.files! as { [fieldname: string]: Express.Multer.File[] };
    if (
        !Object.hasOwnProperty.bind(files)('image') ||
        !Object.hasOwnProperty.bind(files)('watermark')
    ) {
        res.status(400).json({ message: 'You must provide image files.' })
        return
    }

    const imageData = files!['image'][0]
    if (!imageData) {
        res.status(400).json({ message: 'You must provide an image.' })
        return
    }

    // Get position of a watermark
    const RawWatermarkPosition = req.body['watermark-position'] as string
    if (!RawWatermarkPosition) {
        res.status(400).json({ message: 'You must provide a watermark position' })
        return
    }
    const watermarkPositionArray = RawWatermarkPosition.split(':')
    if (watermarkPositionArray.length !== 2) {
        res.status(400).json({ message: 'Invalid watermark position' })
        return
    }
    const watermarkPosition = {
        x: +watermarkPositionArray[0],
        y: +watermarkPositionArray[1]
    }
    if (isNaN(watermarkPosition.x) || isNaN(watermarkPosition.y)) {
        res.status(400).json({ message: 'Invalid watermark position' })
        return
    }

    // Get transformation of a watermark
    const RawWatermarkTransformation = req.body['watermark-transformation'] as string
    if (!RawWatermarkTransformation) {
        res.status(400).json({ message: 'You must provide a watermark transformation' })
        return
    }
    const watermarkTransformationArray = RawWatermarkTransformation.split(':')
    if (watermarkTransformationArray.length !== 3) {
        res.status(400).json({ message: 'Invalid watermark transformation' })
        return
    }
    const watermarkTransformation = {
        angle: +watermarkTransformationArray[0],
        scaleX: +watermarkTransformationArray[1],
        scaleY: +watermarkTransformationArray[2],
    }

    if (isNaN(watermarkTransformation.angle) ||
        isNaN(watermarkTransformation.scaleX) ||
        isNaN(watermarkTransformation.scaleY)
    ) {
        res.status(400).json({ message: 'Invalid watermark transformation' })
        return
    }

    // Get watermark opacity
    const watermarkOpacity = +req.body['watermark-opacity']
    if (watermarkOpacity === undefined) {
        res.status(400).json({ message: 'You must provide a watermark opaciity' })
        return
    }
    if (isNaN(watermarkOpacity)) {
        res.status(400).json({ message: 'Invalid watermark opacity' })
        return
    }

    // Get watermark
    const watermarkData = files!['watermark'][0]
    if (!imageData) {
        res.status(400).json({ message: 'You must provide a wattermark.' })
        return
    }

    const imageBuffer = Buffer.from(imageData.buffer)
    const watermarkBuffer = Buffer.from(watermarkData.buffer)

    const image = await Jimp.read(imageBuffer)
    const watermark = await Jimp.read(watermarkBuffer)

    // Process the images
    watermark.resize(
        watermark.getWidth() * watermarkTransformation.scaleX,
        watermark.getHeight() * watermarkTransformation.scaleY)

    watermark.rotate(-watermarkTransformation.angle)

    image.composite(
        watermark,
        watermarkPosition.x - watermark.getWidth() / 2,
        watermarkPosition.y - watermark.getHeight() / 2, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacityDest: 1,
        opacitySource: watermarkOpacity,
    })

    await image.writeAsync(`./output/${imageData.originalname}`)
    res.download(`./output/${imageData.originalname}`)
})

export default processImage