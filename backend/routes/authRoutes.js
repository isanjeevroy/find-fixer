const express = require("express");
const {
  registerCustomer,
  registerWorker,
  loginCustomer,
  loginWorker,
  logout,
  forgotCustomerPassword,
  resetCustomerPassword,
  workerForgotPassword,
  workerResetPassword,
} = require("../controllers/authController");
const {upload} = require("../middleware/multer.middleware")

const router = express.Router();

router.route("/register/customer").post(upload.single("profile"), registerCustomer);
router.route("/login/customer").post(loginCustomer);

router.route("/register/worker").post(upload.single("profile"), registerWorker);
router.route("/login/worker").post(loginWorker);

router.route("/logout").post(logout);

router.route("/customer/password/forgot").post(forgotCustomerPassword);
router.route("/customer/password/reset/:token").put(resetCustomerPassword);

router.route("/worker/password/forgot").post(workerForgotPassword);
router.route("/worker/password/reset/:token").put(workerResetPassword);

module.exports = router;
