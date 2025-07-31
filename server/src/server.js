require("dotenv").config();
const app = require("./app");
const dbConfig = require("./config/db.config.js");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app is listening to requests on PORT: ${PORT}`);
});
