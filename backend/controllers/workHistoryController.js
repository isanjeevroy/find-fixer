const WorkHistory = require('../models/WorkHistory');
const Worker = require('../models/Worker');

// Book the worker
exports.bookWork = async (req, res) => {
  try {
    const { workerId, worktype, description, price } = req.body;
    const customer = req.user;

    // Log incoming data for debugging
    console.log('Booking Request:', req.body);

    const worker = await Worker.findById(workerId);

    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    const workHistory = await WorkHistory.create({
      customer: customer._id,
      worker: worker._id,
      worktype: worktype || '',
      description: description || '',
      price: price || 0
    });

    customer.workHistory.push(workHistory._id);  // Only push the WorkHistory ObjectId
    await customer.save();

    worker.workHistory.push(workHistory._id);  // Only push the WorkHistory ObjectId
    await worker.save();

    res.status(201).json(workHistory);
  } catch (error) {
    console.error('Error booking work:', error);
    res.status(500).json({ message: "Error occurred while booking work", error });
  }
};
// Complete the work
exports.completeWork = async (req, res) => {
  try {
    const { id } = req.params;
    const { worktype, description, price, rating, feedback } = req.body;

    const workHistory = await WorkHistory.findById(id).populate('customer worker');

    if (!workHistory) {
      return res.status(404).json({ message: 'Work history not found' });
    }

    workHistory.worktype = worktype; // Fill in worktype
    workHistory.description = description; // Fill in description
    workHistory.price = price; // Fill in price
    workHistory.status = 'Completed';
    workHistory.rating = rating;
    workHistory.feedback = feedback;
    workHistory.completedAt = Date.now();
    await workHistory.save();

    res.status(200).json(workHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get work history
exports.getWorkHistory = async (req, res) => {
  try {
    const workHistory = await WorkHistory.find({
      $or: [{ customer: req.user._id }, { worker: req.user._id }]
    }).populate('customer worker');

    res.status(200).json(workHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getWorkHistoryById = async (req, res) => {
  try {
    const workHistory = await WorkHistory.findById(req.params.id).populate('customer worker');

    if (!workHistory) {
      return res.status(404).json({ message: "Work history not found" });
    }

    res.status(200).json(workHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

