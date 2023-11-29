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

exports.getAllNotifications = (req, res) => {
  fs.readFile(path.join(__dirname, '../data/notifications.json'), 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const notifications = JSON.parse(data);
    res.status(200).json(notifications);
  });
};


exports.updateNotification = (req, res) => {
  const id = req.params.id;
  const newNotificationData = req.body;

  fs.readFile(path.join(__dirname, '../data/notifications.json'), 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    let notifications = JSON.parse(data);
    const index = notifications.findIndex(notification => notification.id == id);

    if (index === -1) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    notifications[index] = { ...notifications[index], ...newNotificationData };

    fs.writeFile(path.join(__dirname, '../data/notifications.json'), JSON.stringify(notifications, null, 2), err => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      res.status(200).json(notifications[index]);
    });
  });
};

exports.deleteNotification = (req, res) => {
  const id = req.params.id;

  fs.readFile(path.join(__dirname, '../data/notifications.json'), 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    let notifications = JSON.parse(data);
    const index = notifications.findIndex(notification => notification.id == id);

    if (index === -1) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    notifications.splice(index, 1);

    fs.writeFile(path.join(__dirname, '../data/notifications.json'), JSON.stringify(notifications, null, 2), err => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      res.status(200).json({ message: 'Notification deleted successfully' });
    });
  });
};