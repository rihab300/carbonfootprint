const mongoose = require('mongoose');

// MongoDB connection URI for local instance
const mongoURI = 'mongodb://localhost/mydb'; // Replace 'mydb' with your actual database name

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Get the default connection
const db = mongoose.connection;

// Event listeners for MongoDB connection
db.on('connected', () => {
  console.log(`Connected to MongoDB successfully on ${mongoURI}`);
});

db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

module.exports = db;
