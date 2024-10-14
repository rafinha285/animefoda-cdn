import e from "express";
import path from "path";
import { ANIME_PATH } from "../../config/pathConfig";

export default async function getPoster(req:e.Request,res:e.Response) {
    var {aniId,season,epId} = req.params
    res.set('Cache-Control', 'public, max-age=7200');
    res.sendFile(path.join(ANIME_PATH,aniId,"seasons",season,epId,`${epId}.jpg`))
}