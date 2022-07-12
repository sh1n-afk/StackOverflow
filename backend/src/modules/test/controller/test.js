import Posts from "../../../db/models/mongo/posts.js";
// import client from "../../../db/config/redis.config.js";

export class TestController {
	fetchAllQuestions = async (req, res) => {	
		try {
		  let questions = await Posts.find({postType : "question"});
		  res.status(200).send(questions);
		} catch (err) {
		  console.error(err);
		  res.status(400).send(err);
		}
	  };

	  fetchQuestionsFromCache = async (req, res) => {
		  client.get("test-questions")
				.then(async function(data, err) {
					if (err) 
					{
						console.error(err);
						res.status(500).send("Error when connecting to Redis cache");
					}
					if (data != null) 
					{
						console.log("cache hit");
						res.status(200).send(data);
					} 
					else 
					{
						console.log("cache miss");
						const results = Posts.find({postType : "question"});
						client.set("test-questions", JSON.stringify(results));
						res.status(200).send(results);
					} 
				}
			);
	};

	fetchFromKafkaAndCache = async (req, res) => {
		client.get("test-questions")
			  .then(async function(data, err) {
				if (err) 
				{
					console.error(err);
					res.status(500).send("Error when connecting to Redis cache");
				}
				if (data != null) 
				{
					console.log("Found from cache");
					res.status(200).send(JSON.parse(data));
				} 
				else 
				{
					const message = {};
					message.path = req.route.path;
					make_request("post", message, (err, results) => {
						if (err) {
							console.error(err);
							res.json({
								status: "Error",
								msg: "System error, try again",
							});
						} else {
							console.log("Fetched all questions with kafka-backend");
							console.log(results);
							res.json(results);
							res.end();
						}
					});
				}	
			  })
	}

	insert10K = async (req, res) => {
		try {
			let allQuestions = [];
			let time = new Date();
			let question;
			for (let i = 0; i < 1000; i++) {
				question = new Posts({
					title: (Math.random() + 1).toString(36).substring(7),
					tags: req.body.tags,
					description: (Math.random() + 1).toString(36),
					addedAt: time.toISOString(),
					modifiedTime: time.toISOString(),
					userId: req.body.userId,
					username: req.body.username,
				});
				allQuestions.push(question);
			}
			const results = await Posts.insertMany(allQuestions);
			res.status(200).send("done!");
		} catch (err) {
			console.error(err);
			res.status(500).send("Could not insert questions");
		}
	};
}
