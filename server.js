const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3002;
const db = require("./db/db.json");
const app = express();
// app.use("/api", api);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);
// app.get("/api/notes", (req, res) => {
//   return res.json(db);
// });
// app.post("/api/notes", (req, res) => {
//   let note = req.body;
//   db.push(note);
//   fs.writeFileSync("./db/db.json", JSON.stringify(db));
//   res.json(db);
// });
app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (error, notes) => {
    if (error) {
      return console.log(error);
    }
    res.json(JSON.parse(notes));
  });
});
var noteNewarr;
app.post("/api/notes", (req, res) => {
  const note = req.body;
  fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (error, notes) => {
    if (error) {
      return console.log(error);
    }
    noteNewarr = JSON.parse(notes);
    var noteId = noteNewarr.length;

    let newNote = {
      title: note.title,
      text: note.text,
      id: noteId,
    };

    var newArr = noteNewarr.concat(newNote);

    fs.writeFile(
      path.join(__dirname, "./db/db.json"),
      JSON.stringify(newArr),
      (error, data) => {
        if (error) {
          return error;
        }
        console.log(newArr);
        res.json(newArr);
      }
    );
  });
});
// app.delete("/api/notes:id", (req, res) => {
//   let id = req.params.id;
// });
app.listen(PORT, () =>
  console.log(`App listenig at http://localhost:${PORT} 🚀`)
);
