const { default: mongoose } = require("mongoose");

const packagesSchema = mongoose.Schema(
  {
    packageName: {
      type: String,
      required: [true, "Please provide name for this package"],
      trim: true,
      uniq: true,
      minLength: [3, "Name must be greater than 3 character"],
      maxLength: [200, "Name is too long"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
      message: "Price must be integer!",
    },
    tourTransportType: {
      type: String,
      required: true,
      enum: {
        values: ["air", "bus", "railway", "boat"],
        message: "Package type can't be {VALUE} must be air/bus/railway/boat",
      },
    },
    description: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      require: true,
    },
    duration: {
      type: String,
      trim: true,
    },
    discount: {
      type: String,
      trim: true,
    },
    viewCount: {
      type: Number,
    },
  },
  { timestamps: true }
);

packagesSchema.method.logger = function () {
  console.log("this is logger");
};

const Packages = mongoose.model("packages", packagesSchema);
module.exports = Packages;
