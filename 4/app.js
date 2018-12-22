const express = require("express");
const app = express();
const mustache = require("mustache-express"); //templating engine

app.use("/", express.static(__dirname + "/public"));

app.engine("html", mustache()); //setting templating engine to mustach
app.set("view engine", "html"); //setting view engine to html
app.set("views", __dirname + "/views") //specifying where view files are located


app.get("/", function(req, res) {
  res.render("index"); //no need to put ".html"; we've already specified it's html
})

const PORT = 3000;
app.listen(PORT, function(err) {
  if(err) {
    console.log("error is: " + err);
  } else {
    console.log("listening on port:" + PORT);
  }
})
