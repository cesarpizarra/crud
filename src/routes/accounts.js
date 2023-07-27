const express = require("express");
const router = express.Router();

const CreateService = require("../services/create");
const RetrieveService = require("../services/retrieve");
const UpdateService = require("../services/update");
const DeleteService = require("../services/delete");

// Create Router
router.post("/create", async (req, res) => {
  const { username, password } = req.body;

  const results = await CreateService(username, password);

  if (results) {
    res.status(200).send({
      status: results,
      message: "Successfully Created!",
    });
  } else {
    res.status(500).send({
      status: results,
      message: "Not Created!",
    });
  }
});

// Retrieve Router
router.get(`/retrieve`, async (req, res) => {
  const { fields } = req.query;

  const results = await RetrieveService(fields);

  if (results) {
    res.status(200).send(results);
  } else {
    res.status(500).send({
      status: results,
      message: "Not Retrieved!",
    });
  }
});

// Update Router
router.post(`/update`, async (req, res) => {
  const { id, newUsername, newPassword } = req.body;

  const results = await UpdateService(id, newUsername, newPassword);

  if (results) {
    res.status(200).send({
      status: results,
      message: "Successfully Updated!",
    });
  } else {
    res.status(500).send({
      status: results,
      message: "Not Updated!",
    });
  }
});

// Delete Router
router.get(`/delete`, async (req, res) => {
  const { id } = req.query;

  const results = await DeleteService(id);

  if (results) {
    res.status(200).send({
      status: results,
      message: "Successfully Deleted!",
    });
  } else {
    res.status(500).send({
      status: results,
      message: "Not Deleted!",
    });
  }
});

module.exports = router;
