import {Router} from "express";
import getImg from "./character/getImg";

const characterGetRouter = Router();

characterGetRouter.get("/img/:aniId/:id",getImg);

export default characterGetRouter;