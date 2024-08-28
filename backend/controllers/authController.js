const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorHandler");
const sendEmail = require("../utils/sendEmail");
const Customer = require("../models/Customer");
const Worker = require("../models/Worker");
const sendToken = require("../utils/jwtToken");
const token = require("../utils/jwtToken");
const crypto = require("crypto");
const {uploadOnCloudinary} = require("../utils/cloudinary")
//++++++++++++++++++++++++ Customer +++++++++++++++++++++++++
// register
exports.registerCustomer = catchAsyncErrors(async (req, res) => {
  const { name, email, address, password } = req.body;
  const profileLocalPath = req.file?.path
  
  const profile = await uploadOnCloudinary(profileLocalPath)

  try {
    const customer = await Customer.create({
      name,
      email,
      address,
      password,
      profile: profile.url
    });

    sendToken(customer, 201, res);
    res.status(200).json({ success: true,customer },"User registered successfully.");
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Login
exports.loginCustomer = catchAsyncErrors(async (req, res) => {
  const { email, password } = req.body;
  try {
    const customer = await Customer.findOne({ email }).select("+password");
    if (!customer) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    const isMatch = await customer.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    sendToken(customer, 201, res);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

//++++++++++++++++++++++++ Worker Worker +++++++++++++++++++++++++
// Register
exports.registerWorker = catchAsyncErrors(async (req, res) => {
  const { name, email, adhar, worktype, address, password } = req.body;

  const profileLocalPath = req.file?.path
  const profile = await uploadOnCloudinary(profileLocalPath)

  try {
    const worker = await Worker.create({
      name,
      email,
      adhar,
      worktype,
      address,
      password,
      profile: profile.url
    });

    sendToken(worker, 201, res);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Login
exports.loginWorker = catchAsyncErrors(async (req, res) => {
  const { email, password } = req.body;
  try {
    const worker = await Worker.findOne({ email }).select("+password");
    if (!worker) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    const isMatch = await worker.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    sendToken(worker, 201, res);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Logout
exports.logout = (req, res) => {
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

exports.forgotCustomerPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await Customer.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/customer/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Utility Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});

// Reset Password
exports.resetCustomerPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const customer = await Customer.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!customer) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHander("Password does not matches Confirm password", 400)
    );
  }

  customer.password = req.body.password;
  customer.resetPasswordToken = undefined;
  customer.resetPasswordExpire = undefined;

  await customer.save();

  sendToken(customer, 200, res);
});



exports.workerForgotPassword = catchAsyncErrors(async (req, res, next) => {
  const worker = await Worker.findOne({ email: req.body.email });

  if (!worker) {
    return next(new ErrorHander("Worker not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = worker.getResetPasswordToken();

  await worker.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/worker/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: worker.email,
      subject: `Utility Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${worker.email} successfully`,
    });
  } catch (error) {
    worker.resetPasswordToken = undefined;
    worker.resetPasswordExpire = undefined;

    await worker.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});

exports.workerResetPassword = catchAsyncErrors(async (req, res, next) => {
  // Creating token hash from the received token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // Find worker with matching token and check if the token is not expired
  const worker = await Worker.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!worker) {
    return next(new ErrorHander("Reset Password Token is invalid or has expired", 400));
  }

  // Check if password and confirm password match
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not match Confirm password", 400));
  }

  // Set the new password
  worker.password = req.body.password;
  // Remove reset token and expiration time from the database
  worker.resetPasswordToken = undefined;
  worker.resetPasswordExpire = undefined;

  // Save the new password
  await worker.save();

  // Send the new token
  sendToken(worker, 200, res);
});
