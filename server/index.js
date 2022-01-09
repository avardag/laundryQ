require("dotenv").config();
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const bodyParser = require('body-parser');
const globalErrorHandler = require("./controllers/errorController");

//routes
const userRouter = require("./routes/userRoutes");

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(helmet());
app.use(express.json());
// app.use(express.urlencoded({extended: false}));
// app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

//Mounting router
app.use("/api/v1/users", userRouter);

if (ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

//Error handler
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});

module.exports = app;
