import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
import { config } from "dotenv"
import express from "express"
import morgan from "morgan"
import path from "path"
import signale from "signale"
import { applicationsRouter } from "./routes/applications"
config()
const PORT = process.env.PORT || 8080
const app = express()

app.use(
    cors({
        credentials: true,
        origin: [
            "http://localhost:3000",
        ],
    }),
)
app.use(bodyParser.json())
app.use(cookieParser())
if (process.env.NODE_ENV === "production") { app.use(morgan("combined")) }
app.use("/api/applications", applicationsRouter)
app.get("/applications",(req,res)=> {
    res.sendFile(path.join(__dirname, "./views/applications.html"))
})
app.use("/static", express.static(path.join(__dirname, "public")))

app.listen(PORT, () => signale.start(`App listening on port ${PORT}`))
export default app
