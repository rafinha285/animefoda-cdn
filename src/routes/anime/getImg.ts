import e from "express";
import path from "path";
import {ErrorType, sendError} from "../../functions/Error";
import sendFile from "../../functions/File";
import {setHeader} from "../../functions/Header";
import smbConfig from "../../functions/SmbConfig";
import Console from "../../functions/Console";
import {TEMP_PATH} from "../../config/pathConfig";

export default async function getImg(req:e.Request,res:e.Response){
    setHeader(res)
    try{
        if(req.query.Id == null){
            throw 1
        }
        sendFile().img(res)

        const typesImg = ["jpe","jpg","jpeg","png"]
        // let im = typesImg.length
        for(const ext of typesImg){
            const remotePath = path.join("\\\\anime\\\\",req.query.Id as string,"img",`${req.query.Id as string}.${ext}`);

            try{
                Console.log(`Verificando: ${remotePath}`);

                const exists = await smbConfig.fileExists(remotePath);
                if (!exists) continue;

                const file = await smbConfig.getFile(remotePath, TEMP_PATH);

                // Headers e resposta
                res.setHeader('Content-Type', `image/${ext === 'jpg' ? 'jpeg' : ext}`);
                res.write(file as Buffer);
                res.end();
            }catch(err){
                sendError(res,ErrorType.unauthorized)
            }
            // Console.log(path.join(ANIME_PATH,(req.query.Id as string),"img",`${req.query.Id}.${typesImg[i]}`))
            // let pathImg = path.join(ANIME_PATH,(req.query.Id as string),"img",`${req.query.Id}.${typesImg[i]}`)
            // if(fs.existsSync(pathImg)){
            //     return res.sendFile(pathImg)
            // }
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
