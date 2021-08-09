require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const login = require('./routes/loginRoutes/login');
const stocks = require('./routes/stocksRoutes/stocks');
const cors = require('cors');

const PORT = process.env.PORT || 6060;

app.use(bodyParser.json());
app.use(cors());

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('./stocksreact/build'));
}

app.use('/login', login);
app.use('/stocks', stocks);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;