const fs = require('fs');
const path = require('path');

const hospitalController = {
  getAllHospitals: (req, res) => {
    fs.readFile(path.join(__dirname, '../data/hospitals.json'), 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(200).json(JSON.parse(data));
    });
  },
  getHospitalById: (req, res) => {
    fs.readFile(path.join(__dirname, '../data/hospitals.json'), 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      const hospitals = JSON.parse(data);
      const hospital = hospitals.find(h => h.id === req.params.id);
      if (!hospital) {
        return res.status(404).json({ error: 'Hospital not found' });
      }
      res.status(200).json(hospital);
    });
  },
};

module.exports = hospitalController;