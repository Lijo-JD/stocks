require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const login = require('./routes/loginRoutes/login');
const stocks = require('./routes/stocksRoutes/stocks');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.use('/login', login);
app.use('/stocks', stocks);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

module.exports = app;