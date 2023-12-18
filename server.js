const express = require('express');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const app = express();
const carbonFootprintRoutes = require('./routes/carbonFootprintRoutes'); 
const productRoutes = require('./routes/productRoutes');
const qrCodeRoutes = require('./routes/qrCodeRoutes');


app.get('/', (req, res) => {
  res.send('LOGIN. LOGOUT. REGISTER. CARBONFOOTPRINT. Profile. Management.qr code  YEY');
});

// Connect to MongoDB using Mongoose
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

// Passport configuration
require('./passport-config')(passport);

// Routes setup
app.use('/auth', authRoutes);

// Use carbon footprint routes under /carbon
app.use(express.json());
app.use('/carbon', carbonFootprintRoutes); 


//Routes setup
app.use('/qr', qrCodeRoutes);

// Handle QR code scanning and retrieve product information
app.get('/scan/:qrCode', async (req, res) => {
  try {
    const qrCode = req.params.qrCode;
    const product = await Product.findOne({ qrCode });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    // Calculate carbon footprint for the product
    const carbonFootprint = carbonFootprintController.calculateCarbonFootprint(product);
    product.footprints.push(carbonFootprint); // Store footprint in the product
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
