import e from "express"
import Console from "./functions/Console"
import animeGetRouter from "./routes/animeGetRouter"
import episodeGetRouter from "./routes/episodeGetRouter"
import characterGetRouter from "./routes/characterGetRouter";

const app = e()

app.use("/ani",animeGetRouter)
app.use("/character",characterGetRouter)
app.use("/",episodeGetRouter)

app.get("/", (req,res)=>{
    res.redirect("https://animefoda.top")
})

app.listen(8080,()=>{
    Console.log(`http://0.0.0.0:8080`)
})
