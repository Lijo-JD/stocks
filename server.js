require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const login = require('./routes/loginRoutes/login');
const stocks = require('./routes/stocksRoutes/stocks');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.use(express.static('./stocksreact/build'));

const HOST = '0.0.0.0';

app.use('/login', login);
app.use('/stocks', stocks);

app.listen(process.env.PORT || 6060, HOST, () => console.log("Server running"));

module.exports = app;