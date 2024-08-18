const express = require("express");
const systemConfig = require("./config/system"); //PATH
const methodOverride = require("method-override"); //Override rest 
const bodyParser = require("body-parser");
const path = require("path");
const flash = require("express-flash"); //Alert 
const cookieParser = require("cookie-parser");
const session = require("express-session");

require("dotenv").config();
const database = require("./config/database");
database.connect();

const app = express();
const port = 3000;

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));

//Flash
app.use(cookieParser("ABCD"));
app.use(session({ cookie: { maxAge: 60000}}));
app.use(flash());

//TINY MCE
app.use('/tinymce', express.static(path.join(__dirname,"node_modules", "tinymce")));

const route = require("./routes/reader/index.route");
const routeAdmin = require("./routes/admin/index.route");

app.set("views",`${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));
//App local variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

route(app);
routeAdmin(app);

app.listen(port, ()=>{
    console.log(`App listen on port ${port}`);
});