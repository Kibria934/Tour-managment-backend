const { default: mongoose } = require("mongoose");
const Packages = require("../models/Packages");

const viewCount = async (req, res, next) => {
  const { id } = req.params;
  const valid = mongoose.Types.ObjectId.isValid(id);

  if (valid) {
    let views = await Packages.findById(id);

    if (views.viewCount) {
      let count = views.viewCount;

      count++;

      const result = await Packages.findByIdAndUpdate(id, {
        $set: { viewCount: count++ },
      });
    } else {
      const result = await Packages.findByIdAndUpdate(id, {
        $set: { viewCount: 1 },
      });
    }
  }
  next();
};

module.exports = viewCount;
