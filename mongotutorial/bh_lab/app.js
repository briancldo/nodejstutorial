const express = require("express");
const app = express();
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const bodyparser = require("body-parser");
const url = "mongodb://127.0.0.1:27017/Tutorials";
const log = console.log;

//main site: displays all documents in the collection "students"
app.get("/", function(req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        if(err) {
            log("Error in \"/\" is: " + err);
        } else {
            let db = client.db();
            let students = db.collection("students");

            students.find({}).toArray(function(err, result) {
                if(err){
                    res.send(err);
                }else if(result.length){
                    res.send(JSON.stringify(result));
                }else{
                    res.send("no documents found");
                }
            });
        }
    });
});


//creates a new student with gpa 3.5 (default gpa)
app.get("/students/new/:id", function(req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        let db = client.db();
        let students = db.collection("students");

        students.insertOne({name:req["params"]["id"], gpa:3.5});
        res.send("Successfully added " + req["params"]["id"]);
    });
});


//updates student's gpa to new gpa
app.get("/students/gpa/:name/:newgpa", function(req,res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        let db = client.db();
        let students = db.collection("students");

        students.updateOne({name:req["params"]["name"]}, {$set: {gpa:req["params"]["newgpa"]}});
        res.send("Successfully updated " + req["params"]["name"] + " with new GPA: " + req["params"]["newgpa"]);
    })
});


app.get("/students/delete/:name", function(req,res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        let db = client.db();
        let students = db.collection("students");

        students.deleteOne({name:req["params"]["name"]}, {justOne: true});
        res.send("Successfully deleted " + req["params"]["name"]);
    })
})

const PORT = 3000;
app.listen(PORT, function(err) {
    if(err) {
        log("Listen err: " + err);
    } else {
        log("Listening on port:" + PORT);
    }
});