const path = require('path');

exports.getLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'login.html'));
};

exports.postLogin = (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
};