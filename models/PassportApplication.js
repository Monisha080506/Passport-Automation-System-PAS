const mongoose = require('mongoose');

const passportApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true, trim: true },
  dob: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  idProofType: { type: String, required: true },
  idProofNumber: { type: String, required: true },
  nationality: { type: String, required: true },
  photoUrl: { type: String },
  idProofUrl: { type: String },
  status: { type: String, enum: ['Submitted', 'Approved', 'Rejected'], default: 'Submitted' },
  remarks: { type: String, default: '' },
  appliedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('PassportApplication', passportApplicationSchema);
