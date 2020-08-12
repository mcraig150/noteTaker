var express = require('express');
var path = require('path'); 
const fs = require('fs');
var app = express();
const router = express.Router();
var PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));



//routes to send user to pages
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'/public/index.html'))
});

router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname,"/public/notes.html"));    
});

router.get("/api/notes", (req,res) => {
  res.sendFile(path.join(__dirname,"/db/db.json"));
});

//array to store notes
let notes = [];

//post requests
app.delete("/api/notes/:id", (req, res) => {
  const pJson = path.join(__dirname, "/db/db.json")
  let del;

  notes.forEach(note => {
      if (note.id.toString() == req.params.id){
        del = note.id
      } 
  });

  if (del == -1) {
      return res.sendStatus(404);
  }

  notes.splice(del, 1);

  fs.writeFileSync(pJson, JSON.stringify(notes), (err) => {
      if (err) throw (err);
  });
  return res.sendStatus(200);
});

app.post("/api/notes", (req, res) => {
  const jPath = path.join(__dirname,"/db/db.json");

  fs.readFile(jPath, "utf8", (err, data) => {
    if(err) throw err;

    let note = JSON.parse(data);
    res.json(note);
  });

  let newNote = req.body;
  newNote.id = notes.length;
  notes.push(newNote);

  let notesString = JSON.stringify(notes);
  fs.writeFileSync(jPath, notesString, (err) => {
      if (err) throw err;
      res.json(newNote)
  });
});



app.use("/", router);

 
app.listen(PORT, () => {
    console.log("Starting server on port 3000")
      
});