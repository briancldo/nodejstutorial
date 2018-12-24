const mongo = require("mongodb");
const mongoClient = mongo.MongoClient;
const url = "mongodb://127.0.0.1:27017/Tutorials";

mongoClient.connect(url, function(error, client) {
  let db = client.db();

  if(error) {
    console.log(error);
  } else {
    let animals = db.collection("animals");
    animals.insertOne({name:"buck",weight:"250"});
    animals.find({}).toArray(function(err, results) {
      console.log(JSON.stringify(results));
    });
  }
});
