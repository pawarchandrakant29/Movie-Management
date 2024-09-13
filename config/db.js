const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/movie-management')
    .then(() => console.log('Database Connected Successfully'))
    .catch((err) => console.log('Error', err));