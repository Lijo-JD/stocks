require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const login = require('./routes/loginRoutes/login');
const stocks = require('./routes/stocksRoutes/stocks');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('../stocksreact/build'));
}

app.use('/login', login);
app.use('/stocks', stocks);

app.listen(process.env.PORT || 6060, () => console.log(`Server running on port ${process.env.PORT || 6060}`));

module.exports = app;