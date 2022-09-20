const { default: mongoose } = require("mongoose");
const Packages = require("../models/Packages");
const {
  getTourPackages,
  createTourPackagesService,
  detailsOfTour,
} = require("../services/tourService");

// ------------- Getting all tours packages ---------------
module.exports.getTour = async (req, res, next) => {
  try {
    let filters = { ...req.query };
    let queries = {};
    const excludedObject = ["sort", "page", "limit", "field"];

    excludedObject.forEach((item) => delete filters[item]);

    const operatorField = JSON.stringify(filters);
    const replacedField = operatorField.replace(
      /\b(gt|lt|gte|lte|ne|eq)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(replacedField);

    if (req.query.sort) {
      const sortedBy = req.query.sort.split(",").join(" ");
      queries.sort = sortedBy;
    }
    if (req.query.page || req.query.limit) {
      const { page = 1, limit = 5 } = req.query;
      const skipPackage = (+page - 1) * +limit;
      queries.skip = skipPackage;
      queries.limit = +limit;
    }
    if (req.query.field) {
      const givenFields = req.query.field.split(",").join(" ");
      queries.field = givenFields;
    }
    // Getting data by service function call
    const result = await getTourPackages(filters, queries);

    // Error handling
    result.length != 0
      ? res.status(200).send({
          status: "success",
          message: "Successfully got Packages",
          data: result,
        })
      : next((error = { message: "There is no data  in this query" }));
  } catch (error) {
    next(error);
  }
};

// --------------------- Post a new package ---------------------
module.exports.createTourPackages = async (req, res, next) => {
  try {
    const result = await createTourPackagesService(req.body);

    if (result) {
      res.status(200).send({
        status: "success",
        message: "Successfully created a new package.",
        data: result,
      });
    }
    next((error = { message: "Can't create a new package!" }));
  } catch (error) {
    next(error);
  }
};

// ----------------------------- Gat a tour details by Id -------------------
module.exports.getATourDetails = async (req, res, next) => {
  try {
    // const ObjectId = require("mongoose").Types.ObjectId;
    const { id } = req.params;
    const valid = mongoose.Types.ObjectId.isValid(id);
    let viewCount = 0;

    if (valid) {
      const result = await detailsOfTour(id);
      console.log(result.viewCount);

      result
        ? res.status(200).send({
            status: "success",
            message: "Successfully get packages",
            data: result,
          })
        : res.status(404).send({
            status: "fails",
            message: "There is no tour package with this id!",
          });
    } else {
      next((error = { message: "Your id is not valid!" }));
    }
  } catch (error) {
    next(error);
  }
};
