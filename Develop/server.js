var express = require('express');
var path = require('path'); 
var app = express();
const router = express.Router();





router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'/public/index.html'))
});

router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname,"/public/notes.html"));    
});



app.use("/", router)
 
app.listen(3000, () => {
    console.log("Starting server on port 3000")
      
});