import { Router } from "express";
import getPoster from "./episode/getPoster";
import getStream from "./episode/getStream";

const episodeGetRouter = Router()

episodeGetRouter.get("/epPoster/:aniId/:season/:epId",getPoster)
episodeGetRouter.get("/download/:aniid/:seasonid/:epid/:reso",getPoster)
episodeGetRouter.get("/stream/:aniid/:seasonid/:epid/:reso",getStream)
episodeGetRouter.get("/:aniId/:season/:epId/:file")

export default episodeGetRouter