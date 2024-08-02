const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const userController = require("./controllers/userController.js");
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

// Routes
app.get("/", userController.getAllUsers);
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
