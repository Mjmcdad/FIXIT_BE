const { initModels } = require("./models/index");
const express = require("express");
const authMiddleware = require("./middleware/authmiddleware");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const userRouter = require("./routes/userroute");
const cors = require("cors");

const corsOption = {
  origin: '*',
}; 

app.use(cors(corsOption))

initModels();

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.use(express.json());

app.use("/user", userRouter);
