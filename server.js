const express = require("express");
const app = express();
const path = require("path");
var session = require("express-session");
require("dotenv").config();
require("./models/conn");

const Port = process.env.PORT || 5000;
const staticRoute = require("./routes/staticRoutes");
const blogRoute = require("./routes/blogRoutes");
const adminRoute = require("./routes/adminRoute");

const staticPath = path.join(__dirname, "/public");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(staticPath));
app.use(
  session({
    secret: "Shh, its a secret!",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use("/", staticRoute);
app.use("/", blogRoute);
app.use("/", adminRoute);

app.use(express.static(staticPath));

app.listen(Port, () => {
  console.log(`App running on ${Port}`);
});
