import express from "express";
import { TestController } from "../controller/test.js";

const testRouter = express.Router();
const testController = new TestController();

testRouter.get("/get-test-questions", testController.fetchAllQuestions);
testRouter.get("/get-test-questions-cache", testController.fetchQuestionsFromCache);
testRouter.get("/get-test-questions-kafka", testController.fetchFromKafkaAndCache);
testRouter.post("/insert-random-questions", testController.insert10K);

export default testRouter;
