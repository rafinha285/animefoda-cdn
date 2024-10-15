import e from "express";
import path from "path";
import { ANIME_PATH } from "../../config/pathConfig";
import { ErrorType, sendError } from "../../functions/Error";
import Console from "../../functions/Console";

export default function getStream(req:e.Request,res:e.Response){
    try{
        var {aniId,season,epId,reso} = req.params
        // Console.log(epId,reso,typeof reso)
        var filePath = path.join(ANIME_PATH,aniId,"seasons",season,epId,`${epId}-${reso}.mp4`)
        res.setHeader('Cache-Control', 'public, max-age=7200');
        res.sendFile(filePath)
        // res.download(path.join(ANIME_PATH,aniId,"seasons",seasonId,epId,`${epId}-${reso}.mp4`))
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
}
