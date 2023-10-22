import { NextFunction, Request, Response } from "express"
import fs from 'fs/promises'
import asyncHandler from 'express-async-handler'
import { app } from "../../index"

/**
 * @description cleans up output folder in specified amount of time 
 */
const outputCleaner = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const cleanupPeriod = 1000 // clean up period in milliseconds

    if (Date.now() - app.locals.cleanup_counter > cleanupPeriod) {
        app.locals.cleanup_counter = Date.now()

        const files = await fs.readdir(`${process.cwd()}/output`)

        files.forEach(async (file) => {
            await fs.unlink(`${process.cwd()}/output/${file}`)
        })
    }

    next()
})

export default outputCleaner