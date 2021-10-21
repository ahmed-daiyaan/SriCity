var dbConfig = {
  server: process.env.SERVER,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  options: {
    trustServerCertificate: true
  }
};

const sql = require('mssql');
const engine = require("consolidate")
const path = require("path")
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
app.use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .engine("html", engine.mustache)
  .set("view engine", "html")
  .get("/", (req, res) => res.render("index.html"))
const server = http.createServer(app);
const io = socketIo(server);
let interval;
io.on("connection", (socket) => {
  console.log("New client connected");
  // getData(socket);

  socket.on("disconnect", () => console.log("Client disconnected"));
  global.db = sql.connect(dbConfig, function (err) {
    if (err) console.log(err);
    console.log("Connected to DB");
    getData(socket);
  });
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getData(socket), 10000);
});
const getData = async (socket) => {
  try {
    var request = new sql.Request();

    // query to the database and get the records
    request.query(
      "SELECT * FROM Data WHERE SrNo=(SELECT max(SrNo) FROM Data);",
      function (err, result) {
        if (err) console.log(err);
        console.log(result);
        socket.emit("dataResults", result["recordset"][0]);
      }
    );
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};
server.listen(process.env.PORT, () => console.log(`Listening on port ${port}`));