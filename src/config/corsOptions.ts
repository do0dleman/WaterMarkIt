import { CorsOptions } from "cors";

const whitelist = [
    'http://127.0.0.1:5173',   // for development
    'http://localhost:5173',   // for development
    'http://localhost:3000',   // for development
    'http://127.0.0.1:3000',   // for development
]

const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (whitelist.includes(origin!) || !origin) {
            callback(null, true)
            return
        }
        callback((new Error('Not allowed by CORS')))
    },
    optionsSuccessStatus: 200
}

export default corsOptions