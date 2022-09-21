const {
  getTrendingService,
  getCheapestService,
  updatePackageService,
} = require("../services/getTrendingService");

// ============= Update a tour packages ===============
module.exports.updateTour = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updatePackageService(id, req.body);

    if (result.modifiedCount > 0) {
      res.status(200).send({
        status: "success",
        message: "Successfully updated the packages",
        data: result,
      });
    } else if (result.matchedCount > 0) {
      res.status(404).send({
        status: "fail",
        message: "Your package found but can't update packages!",
      });
    }
    res.status(404).send({
      status: "fail",
      message: "Can't update packages!",
    });
  } catch (error) {
    next(error);
  }
};

// =============== Get the Trending 3 packages ==============
module.exports.trending = async (req, res, next) => {
  try {
    const result = await getTrendingService();

    res.status(200).send({
      status: "success",
      message: "Successfully get the Top 3 trending packages!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// =============== Get the cheapest 3 packages ==============
module.exports.cheapest = async (req, res, next) => {
  try {
    const result = await getCheapestService();

    result
      ? res.status(200).send({
          status: "success",
          message: "Successfully get the Top 3 cheapest packages!",
          data: result,
        })
      : res.status(404).send({
          status: "fail",
          message: "Can't get the Top 3 cheapest packages!",
        });
  } catch (error) {
    next(error);
  }
};
