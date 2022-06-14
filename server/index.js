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
const laundryRoutes = require("./routes/laundryRoutes");
const bookingsRoutes = require("./routes/bookingsRoutes");

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5003;

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
app.use("/api/v1/laundry", laundryRoutes);
app.use("/api/v1/bookings", bookingsRoutes);

if (ENV === "production") {
  console.log("production");
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

//Error handler
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});

module.exports = app;
