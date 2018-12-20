const http = require("http");
const fs = require("file-system");

//read/write files
//reads info from movieA.txt, saves it, and appends new text.
//readFileSync and writeFileSync are synchronous counterparts of --
// -- readFile and writeFile, which are asynchronous
let movieA = fs.readFileSync("./movieA.txt", "utf8");
fs.writeFileSync("./movieA.txt", movieA + "This is text for movie A\n","utf8");

//rename a file
//alternates between "movieB.txt" and "movieBee.txt".
//That's what the error function is for.
  fs.rename("./movieB.txt", "movieBee.txt",
  function(err){
    if(err) {
      fs.rename("./movieBee.txt", "movieB.txt",
        function (e) {
          if(e) {
            console.log("error is " + err);
          } else {
            console.log("Done Bee->B");
          }
        }
      );
    } else {
      console.log("Done B->Bee");
    }
  }
);


//delete a file
fs.unlink("./movieC.txt",
  function(err) {
    if(err) {
      console.log("error is " + err);
    }
  }
);
