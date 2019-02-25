const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');

const app = express();
const rootDir = require('./utility/path');
const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const errorRoute = require('./routes/404');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir,'public')))

app.set('view engine', 'ejs');
app.set('views');

app.use(shopRoute);
app.use('/admin', adminRoute);
app.use(errorRoute);

app.listen(3000, (req, res, next)=>{
    console.log('connected');
});