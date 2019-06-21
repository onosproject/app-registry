import express from 'express'
import bodyParser from 'body-parser'
import signale from 'signale'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { config } from 'dotenv'
import { applicationsRouter } from './routes/applications'
import morgan from 'morgan'

config()
const PORT = process.env.PORT || 3000

const app = express()

app.use(
    cors({
        credentials: true,
        origin: [
            'http://localhost:3000'
        ],
    })
)
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') app.use(morgan('combined'))
app.use('/api/applications', applicationsRouter)

app.listen(PORT, () => signale.start(`App listening on port ${PORT}`))
export default app
