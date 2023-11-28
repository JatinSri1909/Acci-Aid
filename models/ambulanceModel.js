const mongoose = require('mongoose');

const ambulanceSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  driver: String,
  vehicleNumber: String,
  // other fields...
});

ambulanceSchema.index({ location: '2dsphere' });

const Ambulance = mongoose.model('Ambulance', ambulanceSchema);

module.exports = Ambulance;