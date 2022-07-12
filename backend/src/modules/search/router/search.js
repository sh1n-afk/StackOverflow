import express from "express";
import SearchController from "../controller/search.js";

const searchRouter = express.Router();

const searchController = new SearchController();

searchRouter.get(
    "/search/:searchText",
    searchController.fetchSearchResult
  );
  searchRouter.get(
    "/getQuestions",
    searchController.getAllQuestions
  );

export default searchRouter;