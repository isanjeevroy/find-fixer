const ErrorHander = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");
const Worker = require("../models/Worker");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  console.log(token);

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  let user = await Customer.findById(decodedData.id);
  if (!user) {
    user = await Worker.findById(decodedData.id);
  }

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  req.user = user;
  next();
});
