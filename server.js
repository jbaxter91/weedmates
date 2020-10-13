var express = require("express");

var session = require("express-session");

require("dotenv").config();
var PORT = process.env.PORT || process.env.DB_PORT;

var path = require("path");

var app = express();

var db = require("./server/models");

// Requiring passport as we've configured it
var passport = require("./server/config/passport");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
app.set("views", path.join(__dirname + "/server/views"));

var exphbs = require("express-handlebars");
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname + "/server/views/layouts"),
    partialsDir: path.join(__dirname + "/server/views/partials"),
  })
);
app.set("view engine", "handlebars");

var hbs = exphbs.create({});
hbs.handlebars.registerHelper("json", function (context) {
  return JSON.stringify(context);
});

// Routes
// =============================================================
require("./server/routes/api-routes.js")(app);
require("./server/routes/html-routes.js")(app);
require("./server/routes/users-api-routes.js")(app);
require("./server/routes/userRatings-api-routes.js")(app);
require("./server/routes/userBlocks-api-routes.js")(app);

// Start our server so that it can begin listening to client requests.
db.sequelize
  .sync({
    /*force: true,*/
  })
  .then(function () {
    app.listen(PORT, function () {
      console.log(
        "===> Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
    });
  });
