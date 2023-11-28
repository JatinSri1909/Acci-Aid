const fs = require('fs');
const path = require('path');

exports.reportAccident = (req, res) => {
  const { lat, long } = req.body;
  fs.readFile(path.join(__dirname, '../data/accidents.json'), 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const accidents = JSON.parse(data);
    const newAccident = { id: Date.now(), location: { type: 'Point', coordinates: [long, lat] } };
    accidents.push(newAccident);
    fs.writeFile(path.join(__dirname, '../data/accidents.json'), JSON.stringify(accidents, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(201).json({ message: 'Accident reported successfully', accident: newAccident });
    });
  });
};

exports.getNearestAmbulance = (req, res) => {
  const { lat, long } = req.body;
  fs.readFile(path.join(__dirname, '../data/ambulances.json'), 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const ambulances = JSON.parse(data);
    let nearestAmbulance = null;
    let shortestDistance = Infinity;
    for (const ambulance of ambulances) {
      const distance = getDistanceFromLatLonInKm(lat, long, ambulance.location.lat, ambulance.location.long);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestAmbulance = ambulance;
      }
    }
    if (!nearestAmbulance) {
      return res.status(404).json({ error: 'No ambulances available' });
    }
    res.status(200).json(nearestAmbulance);
  });
};

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}