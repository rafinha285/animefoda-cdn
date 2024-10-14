import { Router } from "express";
import getImg from "./anime/getImg";

const animeGetRouter = Router()

animeGetRouter.get("img",getImg)

export default animeGetRouter