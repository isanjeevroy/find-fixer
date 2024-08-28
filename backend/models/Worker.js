const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  adhar: {
    type: Number,
    unique: true,
    maxLength: [12, "Adhar cannot exceed 12 characters"],
    minLength: [12, "Adhar should have 12 characters"],
    required: [true, "Please enter your adhar number"]
  },
  worktype: {
    type: [String],
    required: true,
  },
  address: {
    type: String,
    required: [true, "Please Enter Your Address"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [5, "Password should be greater than 5 characters"],
    select: false,
  },
  ratings: {
    type: Number,
    default: 0
  },
  workHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkHistory"
    }
  ],
  profile:{
    type: String,
    required: true
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});



workerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
workerSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password
workerSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
workerSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to workerSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("Worker", workerSchema);
