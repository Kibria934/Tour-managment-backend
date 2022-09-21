const Packages = require("../models/Packages");

module.exports.getTourPackages = async (filters, queries) => {
  const result = await Packages.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.field)
    .sort(queries.sort);
  const totalPackage = await Packages.countDocuments(result);

  let page = Math.ceil(+totalPackage / Number(queries.limit));

  return { totalPackage, page, result };
};

module.exports.createTourPackagesService = async (data) => {
  return await Packages.create(data);
};

module.exports.detailsOfTour = async (id) => {
  const result = await Packages.findById(id);
  return result;
};
