const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const accountRoutes = require("./routes/accounts");

app.use("/accounts", accountRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
