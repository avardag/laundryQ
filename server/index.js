require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require("cors")
// const bodyParser = require('body-parser');
//routes
const userRouter = require('./routes/userRoutes')

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
// app.use(express.urlencoded({extended: false}));
// app.use(bodyParser.json());
app.use(cors())

//Mounting router
app.use('/api/v1/users', userRouter);

if (ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});


module.exports = app;