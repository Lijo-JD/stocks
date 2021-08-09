require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const login = require('./routes/loginRoutes/login');
const stocks = require('./routes/stocksRoutes/stocks');
const cors = require('cors');

let PORT = process.env.PORT || 6060;
let HOST = 'localhost';

app.use(bodyParser.json());
app.use(cors());

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('../stocksreact/build'));
    HOST = '0.0.0.0';
}

app.use('/login', login);
app.use('/stocks', stocks);

app.listen(PORT, HOST, () => console.log(`Server running on port ${PORT}`));

module.exports = app;