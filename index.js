const express = require("express");
const morgan = require("morgan"); 
const handlebars = require("express-handlebars"); 
const Handlebars = require('handlebars')
const path = require("path");
const app = express();
const route = require("./routes/route");
const session = require('express-session');
const cookieParser = require('cookie-parser')
const flash = require('express-flash')
const {connectionDb} =require("./config/db/index");
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyParser = require('body-parser')
require('dotenv').config(); 

const port = process.env.PORT || 8080;

connectionDb() ; 
app.set('trust proxy', 1)
app.use(cookieParser('Do Minh Quan'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000*60*60*24*15 }
}))
app.use(flash());
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
  );
  app.use(bodyParser.urlencoded({ extended: false }))


app.engine(
  "hbs",
  handlebars.engine({
    defaultLayout: "main",
    extname: "hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
      sum: (a, b) => a + b,
      multiply : (a, b) => a * b,
      eq: function (a, b) {
        return a == b;
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));
route(app);


app.listen(port, () => {
  console.log(` App listening on port http://localhost:` + `${port}`);
});
