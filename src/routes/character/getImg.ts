import e from "express";
import {ErrorType, sendError} from "../../functions/Error";
import {setHeader} from "../../functions/Header";
import sendFile from "../../functions/File";
import imgTypes from "../../types/imgTypes";
import {ANIME_PATH} from "../../config/pathConfig";
import path from "path";
import fs from "fs";

export default function getImg(req:e.Request,res:e.Response){
    setHeader(res)
    try{
        if((req.params.aniId == null)&&(req.params.Id == null)){
            return sendError(res,ErrorType.notFound)
        }
        const {aniId,id} = req.params;
        sendFile().img(res)
        for(let i = 0; i < imgTypes.length; i++){
            let pathImg = path.join(ANIME_PATH,aniId as string,"characters",id as string,`${id}.${imgTypes[i]}`);
            if(fs.existsSync(pathImg)){
                return res.sendFile(pathImg);
            }
        }
        return sendError(res,ErrorType.notFound)
    }catch(err){
        return sendError(res, ErrorType.default, 500, err)
    }
}