const { initModels } = require("./models/index");
const express = require("express");
const authMiddleware = require('./middleware/authmiddleware');
const dotenv = require('dotenv');
dotenv.config(); 
const app = express();
const port = 3000;
const userRouter = require('./routes/userroute');

initModels()



app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.use(express.json());

app.use("/user",userRouter)