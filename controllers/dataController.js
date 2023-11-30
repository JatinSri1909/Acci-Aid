/*exports.getData = (req, res) => {
    const data = [
        { name: 'Hospital 1', icuAvailability: true },
        { name: 'Hospital 2', icuAvailability: false },
    ];

    res.json(data);
};*/

const path = require('path');

exports.getData = (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'form.html'));
};

exports.postData = (req, res) => {
    console.log(req.body);
    res.json({ message: 'Data received' });
};