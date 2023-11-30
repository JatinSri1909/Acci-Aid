const fs = require('fs');
const path = require('path');

const ambulanceController = {
  getAllAmbulances: (req, res) => {
    fs.readFile(path.join(__dirname, '../data/ambulances.json'), 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(200).json(JSON.parse(data));
    });
  },
  getAmbulanceById: (req, res) => {
    fs.readFile(path.join(__dirname, '../data/ambulances.json'), 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      const ambulances = JSON.parse(data);
      const ambulance = ambulances.find(a => a.id === req.params.id);
      if (!ambulance) {
        return res.status(404).json({ error: 'Ambulance not found' });
      }
      res.status(200).json(ambulance);
    });
  },
  updateAmbulance: (req, res) => {
    fs.readFile(path.join(__dirname, '../data/ambulances.json'), 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      const ambulances = JSON.parse(data);
      const ambulanceIndex = ambulances.findIndex(a => a.id === req.params.id);
      if (ambulanceIndex === -1) {
        return res.status(404).json({ error: 'Ambulance not found' });
      }
      const { location, driver, vehicleNumber } = req.body;
      const updatedAmbulance = { ...ambulances[ambulanceIndex], location, driver, vehicleNumber };
      ambulances[ambulanceIndex] = updatedAmbulance;
      fs.writeFile(path.join(__dirname, '../data/ambulances.json'), JSON.stringify(ambulances, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json(updatedAmbulance);
      });
    });
  },
  createAmbulance: (req, res) => {
    const newAmbulance = req.body;

    fs.readFile(path.join(__dirname, '../data/ambulances.json'), 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      const ambulances = JSON.parse(data);

      ambulances.push(newAmbulance);

      fs.writeFile(path.join(__dirname, '../data/ambulances.json'), JSON.stringify(ambulances, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        res.status(201).json(newAmbulance);
      });
    });
  },
};

module.exports = ambulanceController;