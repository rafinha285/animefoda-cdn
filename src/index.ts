import e from "express"
import Console from "./functions/Console"
import animeGetRouter from "./routes/animeGetRouter"
import episodeGetRouter from "./routes/episodeGetRouter"

const app = e()

app.use("/ani",animeGetRouter)
app.use("/",episodeGetRouter)

app.listen(8080,()=>{
    Console.log(`http://0.0.0.0:8080`)
})