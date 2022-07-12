import express from "express";
import TagController from "../controller/tags.js";

const tagRouter = express.Router();

const tagController = new TagController();

tagRouter.get("/checkHealth", tagController.checkHealth);

tagRouter.post("/tags/addTag", tagController.addTag);

tagRouter.get("/tags", tagController.getTags);

tagRouter.get("/tags/:tagId", tagController.getTagsByTagId);

export default tagRouter;
