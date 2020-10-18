const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;


// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("website"));

// Routes
// ========================================================================

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './website/index.html'))
    console.log("Your index!!!");
});

// `/notes` route that returns `notes.html`

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './website/notes.html'));
});


app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", function (error, notes) {
      if (error) {
        return console.log(error);
    }
  
      var parsedNotes = JSON.parse(notes);
  
      res.json(parsedNotes);
    });
});


app.post("/api/notes", (req, res) => {
    req.body.id = Date.now();
    fs.readFile("./db/db.json", "utf8", function (error, notes) {
        if (error) {
            return console.log(error);
      }
  
      var parsedNotes = JSON.parse(notes);
      parsedNotes.push(req.body);

    fs.writeFile("./db/db.json", JSON.stringify(parsedNotes), function (error) {
        if (error) {
            return console.log(error);
        }
            res.json(req.body);
      });
    });
});


app.delete("/api/notes/:id", (req, res) => {
    const id = Number(req.params.id);
    fs.readFile("./db/db.json", "utf8", function (error, notes) {
      if (error) {
        return console.log(error);
      }
      const filteredNotesArray = JSON.parse(notes).filter(
        (note) => note.id !== id
      );
      fs.writeFile("./db/db.json", JSON.stringify(filteredNotesArray), function (
        error
      ) {
        if (error) {
          return console.log(error);
        }
        res.json({ ok: true });
      });
    });
  });
  

// Server listening confirmation
app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});