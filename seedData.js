const mongoose = require('mongoose');
const { ambulanceData, hospitalData } = require('./dummyData');
const Ambulance = require('./models/ambulanceModel');
const Hospital = require('./models/hospitalModel');

mongoose.connect('mongodb://localhost:27017/accidentDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

Ambulance.insertMany(ambulanceData)
  .then(() => {
    console.log('Dummy ambulance data inserted successfully');
    return Hospital.insertMany(hospitalData);
  })
  .then(() => {
    console.log('Dummy hospital data inserted successfully');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error inserting dummy data:', error);
  });