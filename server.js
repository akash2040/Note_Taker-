const express = require("express");
const path = require("path");
const fs = require("fs");
const api = require("./public/assets/js/index.js");
const PORT = process.env.port || 3002;
const db = require("./db/db.json");
const app = express();
app.use("/api", api);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
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
app.get("/api/notes");
app.listen(PORT, () =>
  console.log(`App listenig at http://localhost:${PORT} 🚀`)
);
