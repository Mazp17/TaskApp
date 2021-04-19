const path = require("path");
const morgan = require("morgan");
const express = require("express");
const exphbs = require("express-handlebars");
const flash = require("connect-flash");
const handlebars = require("handlebars");

const helpers = require("handlebars-helpers")();

//sessions
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const pool = require("./database");

const { database } = require("./lib/keys");

const port = 3000;

const app = express();


//functions
function DateNow(date) {
  var d = new Date(date),
    month = d.getMonth() + 1,
    day = d.getDate(),
    year = d.getFullYear();

  var dateNow = [year, month, day].join("-");
  return dateNow;
}

//helpers
handlebars.registerHelper("noEntregada", (fechaEntrega) => {
  date = new Date();
  let dateNow = DateNow(date);
  let entrega = DateNow(fechaEntrega)
  if(dateNow > entrega) 
    return 0;
  else 
    return 1;
});
handlebars.registerHelper("enviado", (enviado) => {
  if(enviado === 1) {
    return 0;
  } else {
    return 1;
  };
});

//setting


// view Engine
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");



//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(flash());
app.use(session({
  secret: 'taskApp',
  resave: false,
  saveUninitialized: false,
  store: mysqlSession(database)
}));

//GLOBAL  
app.use((req, res, next) => {
  app.locals.flashMessages = req.flash();
  next();
});

//Routes
app.get("/", async (req, res) => {
  /* res.json(asignaturas); */
  const tasks = await pool.query("SELECT * FROM task");
  if (tasks == 0) {
    notTasks = 1;
  } else {
    notTasks = 0;
  };
  res.render("index", { tasks , notTasks});
});

app.use(require("./routes/tasks"));

//static files declarations
app.use(express.static(path.join(__dirname, "public")));

//app running
app.listen(port, () => {
  console.log("Server running in port ", port);
  console.log("route running in the app is: htttp://localhost:" + port);
});
