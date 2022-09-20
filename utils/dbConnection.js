const { default: mongoose } = require("mongoose");

module.exports.dbConnect = () => {
  mongoose
    .connect(process.env.ATLASH_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("database connected".yellow.bold);
    });
};
