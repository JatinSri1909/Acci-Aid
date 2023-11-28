const mongoose = require('mongoose');

const accidentSchema = new mongoose.Schema({
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
  description: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

accidentSchema.index({ location: '2dsphere' });

const Accident = mongoose.model('Accident', accidentSchema);

module.exports = Accident;