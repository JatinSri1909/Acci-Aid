const ambulanceData = [
  {
    driver: 'John Doe',
    vehicleNumber: '1234',
    location: {
      type: 'Point',
      coordinates: [longitude, latitude] // replace with actual values
    },
    // other fields...
  },
  // other ambulances...
];

const hospitalData = [
  {
    name: 'General Hospital',
    location: {
      type: 'Point',
      coordinates: [longitude, latitude] 
    },
    // other fields...
  },
  // other hospitals...
];

module.exports = { ambulanceData, hospitalData };