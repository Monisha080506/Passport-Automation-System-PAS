const PassportApplication = require('../models/PassportApplication');

exports.createApplication = async (req, res, next) => {
  try {
    const {
      fullName,
      dob,
      address,
      phone,
      email,
      idProofType,
      idProofNumber,
      nationality,
    } = req.body;

    if (!fullName || !dob || !address || !phone || !email || !idProofType || !idProofNumber || !nationality) {
      return res.status(400).json({ message: 'Please complete all required application fields.' });
    }

    const application = await PassportApplication.create({
      user: req.user.id,
      fullName,
      dob,
      address,
      phone,
      email,
      idProofType,
      idProofNumber,
      nationality,
      photoUrl: req.files?.photo?.[0]?.path || '',
      idProofUrl: req.files?.idProof?.[0]?.path || '',
    });

    res.status(201).json({ application });
  } catch (error) {
    next(error);
  }
};

exports.getMyApplications = async (req, res, next) => {
  try {
    const applications = await PassportApplication.find({ user: req.user.id }).sort({ appliedAt: -1 });
    res.json({ applications });
  } catch (error) {
    next(error);
  }
};

exports.getApplicationStatus = async (req, res, next) => {
  try {
    const application = await PassportApplication.findById(req.params.id);
    if (!application || application.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Application not found.' });
    }
    res.json({ application });
  } catch (error) {
    next(error);
  }
};
