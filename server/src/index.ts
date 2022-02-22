import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express, { json } from 'express'
import { sequelize } from './db/models'
import { errorMiddleware } from './middlewares/error'
import router from './routes'

const app = express()

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))
app.use(json())
app.use(cookieParser())
app.use('/api', express.static('static'))
app.use('/api', router)
app.use(errorMiddleware)

app.set('trust proxy', 1)

const start = async () => {
    try {
        await sequelize.sync()

        app.listen(process.env.PORT, () =>
            console.log(`Server is working on port ${process.env.PORT}`)
        )
    } catch (e) {
        console.log(e)
    }
}

start()
