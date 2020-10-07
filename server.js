var express = require("express");

var PORT = process.env.PORT || 8080;

var path = require('path');

var app = express();

var db = require("./server/models");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
app.set('views', path.join( __dirname + '/server/views'));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
        defaultLayout: 'main',
        layoutsDir: path.join( __dirname + '/server/views/layouts'),
        partialsDir:path.join( __dirname + '/server/views/partials')
}));
app.set('view engine', 'handlebars');

var hbs = exphbs.create({});
hbs.handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context);
});

// Routes
// =============================================================
require("./server/routes/api-routes.js")(app);
require("./server/routes/html-routes.js")(app);

// Start our server so that it can begin listening to client requests.
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log(`App listening at http://${process.env.DB_HOST}`);
  });
});
