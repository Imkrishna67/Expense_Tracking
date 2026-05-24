const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    isConnected = conn.connections[0].readyState === 1;

    console.log('MongoDB Connected');
  } catch (error) {
    console.log('MongoDB Connection Failed:', error.message);
    throw error;
  }
};

module.exports = connectDB;