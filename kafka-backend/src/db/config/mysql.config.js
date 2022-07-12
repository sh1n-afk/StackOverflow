import Sequelize from "sequelize";
import constants from "./sqlConfig.json";

// Create connection to database
// var connection = mysql.createConnection({
//   host: constants.DB.host,
//   user: constants.DB.username,
//   password: constants.DB.password,
//   port: constants.DB.port,
//   database: constants.DB.database,
// });

// // Connect to database
// connection.connect(function (err) {
//   if (err) {
//     console.log("error connecting:" + err.message);
//   } else {
//     console.log("connected successfully to DB.");
//   }
// });

const db = new Sequelize(
  constants.DB.database,
  constants.DB.username,
  constants.DB.password,
  {
    host: constants.DB.host,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

try {
  await db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default db;
