const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Customer = require('../models/Customer');
const Worker = require('../models/Worker');

// Get Customer Profile
exports.getCustomerProfile = catchAsyncErrors(async (req, res) => {
  try {
    const customer = await Customer.findById(req.user.id).populate({
      path: 'workHistory',
      populate: {
        path: 'worker', // Populate worker details in each workHistory entry
        select: 'name email address'
      }
    });

    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update Customer Profile
exports.updateCustomerProfile =catchAsyncErrors( async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Search Workers
exports.searchWorkers = catchAsyncErrors(async (req, res) => {
  const { location, workType } = req.query;
  try {
    const workers = await Worker.find({
      address: { $regex: location, $options: 'i' },
      workType: { $regex: workType, $options: 'i' },
    });
    res.status(200).json({ success: true, data: workers });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
