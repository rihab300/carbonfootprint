const express = require('express');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/user');

const app = express();


app.get('/', (req, res) => {
  res.send('LOGIN LOGOUT REGISTER YEY');
})


//Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

//Passport configuration
require('./passport-config')(passport);

// Routes setup
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
