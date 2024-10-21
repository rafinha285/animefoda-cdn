import e from "express";
import fs from "fs";
import path from "path";
import { ANIME_PATH } from "../../config/pathConfig";
import { ErrorType, sendError } from "../../functions/Error";
import sendFile from "../../functions/File";
import { setHeader } from "../../functions/Header";

export default function getImg(req:e.Request,res:e.Response){
    setHeader(res)
    try{
        if(req.query.Id == null){
            throw 1
        }
        sendFile().img(res)
        const typesImg = ["jpe","jpg","jpeg","png"]
        let im = typesImg.length
        for(let i = 0;i<im;i++){
            // Console.log(path.join(ANIME_PATH,(req.query.Id as string),"img",`${req.query.Id}.${typesImg[i]}`))
            let pathImg = path.join(ANIME_PATH,(req.query.Id as string),"img",`${req.query.Id}.${typesImg[i]}`)
            if(fs.existsSync(pathImg)){
                return res.sendFile(pathImg)
            }
        }
        throw 2
    }catch(err){
        if(err == 1){
            sendError(res,ErrorType.undefined)
        }else if(err == 2){
            sendError(res,ErrorType.NotId)
        }
    }
}
