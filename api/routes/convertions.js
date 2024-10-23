
const convertions = require("../controllers/convertions.controller.js");

var router = require("express").Router();

// Create a new Convertions
router.post("/", convertions.create);

// Retrieve all Convertionss
router.get("/", convertions.findAll);

// Retrieve all published Convertionss
router.get("/published", convertions.findAllPublished);

// Retrieve a single Convertions with id
router.get("/:id", convertions.findOne);

// Update a Convertions with id
router.put("/:id", convertions.update);

// Delete a Convertions with id
router.delete("/:id", convertions.delete);

// Create a new Convertions
router.delete("/", convertions.deleteAll);


module.exports = router;