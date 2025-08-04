require("dotenv").config();
const server = require("./app");
const dbConfig = require("./config/db.config.js");

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`app is listening to requests on PORT: ${PORT}`);
});
