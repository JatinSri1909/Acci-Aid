const express = require('express');
const bodyParser = require('body-parser');
const ambulanceRoutes = require('./routes/ambulanceRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const accidentRoutes = require('./routes/accidentRoutes');
const notificationRoutes = require('./routes/notificationRoutes'); 
const feedbackRoutes = require('./routes/feedbackRoutes'); 
const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use('/ambulance', ambulanceRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/accident', accidentRoutes);
app.use('/notification', notificationRoutes);
app.use('/feedback', feedbackRoutes);

app.get('/', (req, res) => {
  res.send('Hello Ishita!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;