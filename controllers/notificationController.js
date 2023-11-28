const fs = require('fs');
const path = require('path');

exports.sendNotification = (req, res) => {
  const { notification } = req.body;
  fs.readFile(path.join(__dirname, '../data/notifications.json'), 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const notifications = JSON.parse(data);
    const newNotification = { id: Date.now(), message: notification };
    notifications.push(newNotification);
    fs.writeFile(path.join(__dirname, '../data/notifications.json'), JSON.stringify(notifications, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while sending notification' });
      }
      res.status(200).json({ message: 'Notification sent successfully' });
    });
  });
};