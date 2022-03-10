const express = require("express");
var cors = require('cors');
var path = require('path');
var homeRouter = require('./routes/home');
var loginRouter = require('./routes/login');
var denouncesRouter = require('./routes/denounce');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger_output.json');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use('/', homeRouter)
app.use('/login', loginRouter)
app.use('/denounces', denouncesRouter)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://dbRenADice:senha123@rentadice.rvs7h.mongodb.net/rent_dice?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


module.exports = app;
