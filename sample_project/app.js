const express = require('express');
const app = express();
const message = require("./message.js");
let allLetters = "";

console.log(message["letters"]);


app.get("/", function (request, response) {

  for(let i = 0; i < message["letters"].length; i++) {
    allLetters += message["letters"][i] + "<br />";
  }
  response.send(allLetters);
});

//the colon in front of name means it'll be swapped out for something else in the GET request
app.get("/users/:name", function (req, res) {
  res.send(req["params"]["name"]);
});

app.listen(3000, function(error) {
  if(error == true) {
    console.log("error occured");
  } else {
    console.log("listening on localhost:3000");
  }
});
