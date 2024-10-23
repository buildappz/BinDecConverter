const db = require("../models");
const Convertion = db.convertions;
const Op = db.Sequelize.Op;

const convertNumber = (isBinary, text) => {
    if (typeof isBinary !== 'boolean') {
        return { error: "First parameter must be a boolean." };
    }

    if (isBinary) {
        if (/^[01]+$/.test(text)) {
            return { output: parseInt(text, 2) }; // Binary to Decimal
        } else {
            return { error: "The input is not a valid binary number." };
        }
    } else {
        if (/^\d+$/.test(text)) {
            return { output: parseInt(text, 10).toString(2) }; // Decimal to Binary
        } else {
            return { error: "The input is not a valid decimal number." };
        }
    }
};


// Create and Save a new Convertion
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Convertion
    const convertion = {
      owner: req.body.owner,
      input: req.body.input,
      convertion: req.body.convertion,
      output: convertNumber(req.body.convertion,req.body.input)
    };
  
    // Save Convertion in the database
    Convertion.create(convertion)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Convertion."
        });
      });
  };
  
// Retrieve all Convertions from the database (with optional filtering)
exports.findAll = (req, res) => {
    const { owner, input } = req.query;
    const condition = {
        ...(owner && { owner: { [Op.eq]: owner } }),
        ...(input && { input: { [Op.like]: `%${input}%` } })
    };

    Convertion.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Convertions."
            });
        });
};

// Find a single Convertion by ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Convertion.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Convertion with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Convertion with id=" + id
            });
        });
};

// Update a Convertion by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    if (req.body.convertion !== undefined && req.body.input !== undefined) {
        const result = convertNumber(req.body.convertion, req.body.input);
        if (result.error) {
            return res.status(400).send({ message: result.error });
        }
        req.body.output = result.output.toString(); // Add the converted output
    }

// Delete a Convertion with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Convertion.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Convertion was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Convertion with id=${id}. Maybe Convertion was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Convertion with id=" + id
            });
        });
};

// Delete all Convertions from the database
exports.deleteAll = (req, res) => {
    Convertion.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Convertions were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Convertions."
            });
        });
};

// Find all Convertions by owner
exports.findByOwner = (req, res) => {
    const owner = req.params.owner;

    Convertion.findAll({ where: { owner: owner } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Convertions."
            });
        });
};
}