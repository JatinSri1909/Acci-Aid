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

exports.getAllAccidents = (req, res) => {
  fs.readFile(path.join(__dirname, '../data/accidents.json'), 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const accidents = JSON.parse(data);
    res.status(200).json(accidents);
  });
};

exports.getAccidentById = (req, res) => {
  const id = req.params.id;

  fs.readFile(path.join(__dirname, '../data/accidents.json'), 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const accidents = JSON.parse(data);
    const accident = accidents.find(accident => accident.id == id);

    if (!accident) {
      return res.status(404).json({ error: 'Accident not found' });
    }

    res.status(200).json(accident);
  });
};

exports.updateAccident = (req, res) => {
  const id = req.params.id;
  const newAccidentData = req.body;

  fs.readFile(path.join(__dirname, '../data/accidents.json'), 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    let accidents = JSON.parse(data);
    const index = accidents.findIndex(accident => accident.id == id);

    if (index === -1) {
      return res.status(404).json({ error: 'Accident not found' });
    }

    accidents[index] = { ...accidents[index], ...newAccidentData };

    fs.writeFile(path.join(__dirname, '../data/accidents.json'), JSON.stringify(accidents, null, 2), err => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      res.status(200).json(accidents[index]);
    });
  });
};

exports.deleteAccident = (req, res) => {
  const id = req.params.id;

  fs.readFile(path.join(__dirname, '../data/accidents.json'), 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    let accidents = JSON.parse(data);
    const index = accidents.findIndex(accident => accident.id == id);

    if (index === -1) {
      return res.status(404).json({ error: 'Accident not found' });
    }

    accidents.splice(index, 1);

    fs.writeFile(path.join(__dirname, '../data/accidents.json'), JSON.stringify(accidents, null, 2), err => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      res.status(200).json({ message: 'Accident deleted successfully' });
    });
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