import express from "express";
import AdminController from "../controller/admin.js";

const adminRouter = express.Router();

const adminController = new AdminController();

adminRouter.get("/checkHealth", adminController.checkHealth);
adminRouter.put("/update/question/status", adminController.updateQuestionStatus);
adminRouter.get("/get/top10MostViewedQuestions", adminController.top10MostViewedQuestions);
adminRouter.get("/get/top10MostUsedTags", adminController.top10MostUsedTags);
// The number of questions posted per day. 
// Top 10 users with highest reputation.
//  Top 10 users with lowest reputation.

export default adminRouter;



