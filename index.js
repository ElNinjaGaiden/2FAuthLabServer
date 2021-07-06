const express = require('express');
const mongoose = require('mongoose');
const api = require('./api');
const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: '.env' });
}

// Deal with configuration
const databaseConnectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true
};
const { 
    PORT,
    DATABASE_USER: dbUser,
    DATABASE_PASSWORD: dbPassword,
    DATABASE_NAME: dbName
} = process.env;
const dbConnString = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.ybgkb.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const _PORT = PORT || 5000;

// Create express app
const app = express();

// Middlewares
app.use(express.json());

// Express endpoints
app.use('/api', api);

// Start the express app
app.listen(_PORT, async () => {
    console.log(`Listening on port ${_PORT}`)
    try {
        await mongoose.connect(dbConnString, databaseConnectionOptions);
        console.log('MongoDB database connected');
    } catch (dbError) {
        console.error('Error connecting to the db', dbError);
    }
});

// when shutdown signal is received, do graceful shutdown
process.on('SIGINT', async (signal) => {
    try {
      await mongoose.disconnect();
      console.log('Database connection closed');
      process.exit();
    }
    catch (ex) {
      console.log('Error closing database connection', ex);
    }
});
