const express = require('express');
const app = express();

// Routes setup
app.get('/', (req, res) => {
  res.send('Hello from your backend!');
});

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

