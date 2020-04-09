const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {useNewUrlParser: true});

const database = mongoose.connection;

database.on('error', console.error.bind(console, 'connection error:'));
database.on('open', () => console.log('Successfully contected'));