const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Choose your preferred port

app.get('/', (req, res) => {
  res.send('Hello, world!'); // Just a test endpoint
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
