const viewCount = require("../middleware/viewCount");
const Packages = require("../models/Packages");

module.exports.updatePackageService = async (id, doc) => {
  console.log(id);
  const result = await Packages.updateOne(
    { _id: id },
    { $set: doc },
    { runValidators: true }
  );
  return result;
};

module.exports.getTrendingService = async () => {
  return await Packages.find({ viewCount: { $exists: true } })
    .sort("-viewCount")
    .limit(3);
};

module.exports.getCheapestService = async () => {
  const result = await Packages.find({ viewCount: { $exists: true } })
    .sort("viewCount price")
    .limit(3);

  return result;
};
