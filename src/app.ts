import bodyParser from "body-parser";
config()
const PORT = process.env.PORT || 3000
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
