import QuestionController from "../src/modules/post/controller/posts.js";

const handleQuestionRequest = async (req, callback) => {
  console.log("----------------", req.path, "----------------");

  const questionController = new QuestionController();
  let results;
  switch (req.path) {
    case "/questions":
      results = await questionController.fetchAllQuestions();
      break;
    case "/get-test-questions-kafka":
        results = await questionController.fetch10kQuestions();
        break;
    case "/fetch/questions":
      results = await questionController.fetchQuestionDetails(req.body);
      break;
    case "/question/addView":
      results = await questionController.addView(req.body);
      break;
    case "/question/postAnswer":
      results = await questionController.postAnswer(req.body);
      break;
    case "/answer/postComment":
      results = await questionController.postCommentToAnswer(req.body);
      break;
  }

  callback(null, results);
};

export default handleQuestionRequest;
