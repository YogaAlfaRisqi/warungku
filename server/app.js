const express = require('express');  // ← WAJIB ada!
const app = express();
const helmet = require('helmet');      
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Middleware parsing
app.use(express.json());
// app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Routes
app.use('/api/', require('./routes')); // Pastikan ./routes/index.js ada
app.get('/api', (req, res) => {
  res.send('Welcome to WARUNGKU APIs')
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Pages not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
