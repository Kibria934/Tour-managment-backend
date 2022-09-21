const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { dbConnect } = require("./utils/dbConnection");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const colors = require("colors");
const { errorHandler } = require("./utils/errorHandler");
const tourRouter = require("./routes/tours.router");
const LogicalRouter = require("./routes/tour.router");

// Middleware
app.use(cors());
app.use(express.json());

// Db connection
dbConnect();

// Routers
app.use("/tours", tourRouter);
app.use("/tour", LogicalRouter);

// Error handlers
app.use(errorHandler);

// Application
app.listen(port, () =>
  console.log("Tour management server is running on port", port)
);
