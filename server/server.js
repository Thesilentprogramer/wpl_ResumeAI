const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const resumeRoutes = require('./routes/resumeRoutes');
const chatRoutes = require('./routes/chatRoutes');
const exportRoutes = require('./routes/exportRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/resume', resumeRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// MongoDB connection with better error handling and fallback mode
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority'
    });
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.warn('⚠️  MongoDB connection failed, running in fallback mode');
    console.warn('❌ Error:', error.message);
    console.warn('📝 Note: Analysis data will not be persisted');
  }
};

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

