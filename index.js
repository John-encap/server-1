const express = require ('express');
const app = express();
require("dotenv").config();
const userRouter = require("./api/user/user.router");


app.use(express.json());

app.use("/api/user", userRouter);




app.listen(process.env.APP_PORT, () => {
    console.log(process.env.APP_PORT);
});