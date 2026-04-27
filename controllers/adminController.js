const PassportApplication = require('../models/PassportApplication');

exports.getAllApplications = async (req, res, next) => {
  try {
    const applications = await PassportApplication.find().populate('user', 'name email').sort({ appliedAt: -1 });
    res.json({ applications });
  } catch (error) {
    next(error);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { status, remarks } = req.body;
    const application = await PassportApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found.' });
    }

    application.status = status || application.status;
    application.remarks = remarks || application.remarks;
    await application.save();

    res.json({ application });
  } catch (error) {
    next(error);
  }
};
