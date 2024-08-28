const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Worker = require('../models/Worker');

// Get Worker Profile
exports.getWorkerProfile = catchAsyncErrors(async (req, res) => {
  try {
    const workerId = req.user.id;
    console.log('Worker ID:', workerId); // Log the worker ID

    const worker = await Worker.findById(workerId)
      .populate({
        path: 'workHistory',
        populate: { path: 'customer', select: 'name email address' }
      });

    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    res.json({ data: worker });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Update Worker Profile
exports.updateWorkerProfile = catchAsyncErrors(async (req, res) => {
  try {
    const worker = await Worker.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: worker });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
exports.getAllWorkers = catchAsyncErrors(async (req,res) =>{
  try{
    const workers = await Worker.find();
    res.status(200).json({success:true,workers});
  }
  catch(error){
  console.log(error);
  }
})
