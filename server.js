const express = require("express");
const api = require("./public/assets/js/index");
const PORT = process.env.port || 3002;

const app = express();
app.use("/api", api);
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);
app.listen(PORT, () =>
  console.log(`App listenig at http://localhost:${PORT} 🚀`)
);
