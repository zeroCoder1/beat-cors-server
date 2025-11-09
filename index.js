const express = require('express');
const axios = require('axios');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'CORS Proxy Server is running' });
});

app.get('/jokes/random', async (req, res) => {
  try {
    const response = await axios.get('https://evilinsult.com/generate_insult.php?lang=en&type=json');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching joke:', error.message);
    res.status(500).json({ type: 'error', message: 'Failed to fetch joke' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
