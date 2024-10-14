import e from "express";
import path from "path";
import { ANIME_PATH } from "../../config/pathConfig";
// import {cdnUrl} from "../../config/config.json"
import { setHeader } from "../../functions/Header";

export default function getFile(req:e.Request,res:e.Response){
    setHeader(res)
    // Console.log(req.ip)
    var {aniId,season,epId,file} = req.params
    if(file.split(".")[1] == "mp4"){
        let fileReso = file.split("-")[1].replace(".mp4","")
        return res.redirect(`https://cdn.animefoda.top/ep/stream/${aniId}/${season}/${epId}/${fileReso}`)
    }
    res.set('Cache-Control', 'public, max-age=7200')
    res.sendFile(path.join(ANIME_PATH,aniId,"seasons",season,epId,file))
}