const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
// env variables
require('dotenv/config');

// cors
app.use(cors());
app.options('*', cors());

// middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);
app.use('/public/uploads',express.static(__dirname + '/public/uploads'))
//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);


if (process.env.NODE_ENV == 'production') {
    // mongodb connection string
    mongoose.connect(process.env.CONNECTION_STRING,
        { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Database connection is very ready...");
        })
        .catch((err) => {
            console.log(err);
        })
}

// mongodb connection string
mongoose.connect(process.env.CONNECTION_STRING_LOCAL, 
    {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Database connection is very ready...");
})
.catch((err)=>{
    console.log(err);
})

app.listen(7500, () => {
    console.log('Server started running on 7500');
});