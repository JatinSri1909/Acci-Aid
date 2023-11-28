const fs = require('fs');
const path = require('path');

exports.receiveFeedback = (req, res) => {
  const { feedback } = req.body;
  fs.readFile(path.join(__dirname, '../data/feedbacks.json'), 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const feedbacks = JSON.parse(data);
    const newFeedback = { id: Date.now(), message: feedback };
    feedbacks.push(newFeedback);
    fs.writeFile(path.join(__dirname, '../data/feedbacks.json'), JSON.stringify(feedbacks, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while saving feedback' });
      }
      res.status(200).json({ message: 'Feedback received successfully' });
    });
  });
};