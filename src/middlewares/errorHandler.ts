import { NextFunction, Request, Response } from "express"
import { MulterError } from "multer"

export default function errroHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack)

    if (err instanceof SyntaxError && (err as any).status === 400 && 'body' in err) {
        res.status(400).json({ message: err.message }) // Bad request
        next()
    }
    else if (err instanceof MulterError) {
        res.status(400).json({ message: err.message })
        next()
    }
    else if (err.message === 'Unexpected end of form') {
        res.status(400).json({ message: err.message }) // checks if all form fields are provided
        next()
    }
    else if (err.message === 'Not allowed by CORS') {
        res.status(400).json({ message: err.message })
        next()
    }
    else {
        res.status(500).json({ message: 'Something went wrong' })
        next()
    }
}  