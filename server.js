const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.port || 3002;
const db = require("./db/db.json");
const app = express();
// app.use("/api", api);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);
app.get("/api/notes", (req, res) => {
  return res.json(db);
});
app.post("/api/notes", (req, res) => {
  let note = req.body;
  db.push(note);
  fs.writeFileSync("./db/db.json", JSON.stringify(db));
  res.json(db);
});
// app.delete("/api/notes:id", (req, res) => {
//   let id = req.params.id;
// });
app.listen(PORT, () =>
  console.log(`App listenig at http://localhost:${PORT} 🚀`)
);
