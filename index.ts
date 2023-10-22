import express from 'express'
import imageRouter from './src/routers/imageRouter'
import errroHandler from './src/middlewares/errorHandler'
import outputCleaner from './src/middlewares/outputCleaner'
import corsOptions from './src/config/corsOptions'
import cors from 'cors'
import path from 'path'
require('dotenv').config()

export const app = express()
const port = process.env.PORT || 3000

app.locals.cleanup_counter = Date.now()

app.use(cors(corsOptions))
app.use(express.json())
app.use(outputCleaner)
app.use(express.static(path.join(__dirname, 'client', 'dist')))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", 'index.html'));
});

app.use('/image', imageRouter)

app.use(errroHandler)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
