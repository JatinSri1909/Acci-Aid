const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ambulanceRoutes = require('./routes/ambulanceRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const accidentRoutes = require('./routes/accidentRoutes');
const notificationRoutes = require('./routes/notificationRoutes'); 
const feedbackRoutes = require('./routes/feedbackRoutes'); 
const dataRoutes = require('./routes/dataRoutes'); 
const loginRoutes = require('./routes/loginRoutes'); 
const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use('/ambulance', ambulanceRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/accident', accidentRoutes);
app.use('/notification', notificationRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/data', dataRoutes);
app.use('/login', loginRoutes);
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'indexPage.html'));
});
app.get('/mapping', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'Mapping.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;