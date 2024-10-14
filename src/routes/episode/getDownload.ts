import e from "express";
import path from "path";
import fs from "fs";
import Console from "../../functions/Console";
import { ErrorType, sendError } from "../../functions/Error";
import { ANIME_PATH } from "../../config/pathConfig";

export default async function getDownload(req:e.Request,res:e.Response) {
    try{
        let { aniid, seasonid, epid, reso } = req.params;
        let filePath = path.join(ANIME_PATH, aniid, 'seasons', seasonid, epid, `${epid}-${reso}.mp4`);

        Console.log('File path:', filePath); // Adicione isso para verificar o caminho do arquivo

        const stat = fs.statSync(filePath);
        const fileSize = stat.size;

        const readStream = fs.createReadStream(filePath);

        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Content-Length', fileSize);
        res.setHeader('Content-Disposition', `attachment; filename=${epid}.mp4`);

        let uploadedBytes = 0;
        readStream.on('data', (chunk) => {
            uploadedBytes += chunk.length;
            const canWrite = res.write(chunk);
            // console.log('Can write:', canWrite); // Adicione isso para verificar o status de escrita
            if (!canWrite) {
                readStream.pause();
            }
        });

        res.on('drain', () => {
            // console.log('Drain event'); // Adicione isso para verificar quando o buffer está vazio
            readStream.resume();
        });

        readStream.on('end', () => {
            Console.log('End of stream');
            res.end();
        });

        readStream.on('error', (err) => {
            console.error('Stream error:', err);
            res.status(500).end();
        });
        // res.sendFile(filePath)
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }    
}
