import { Router } from "express";
import getPoster from "./episode/getPoster";
import getStream from "./episode/getStream";
import getDownload from "./episode/getDownload";

const episodeGetRouter = Router()

episodeGetRouter.get("/epPoster/:aniId/:season/:epId",getPoster)
episodeGetRouter.get("/download/:aniId/:seasonId/:epId/:reso",getDownload)
episodeGetRouter.get("/stream/:aniId/:seasonId/:epId/:reso",getStream)
episodeGetRouter.get("/:aniId/:season/:epId/:file")

export default episodeGetRouter
