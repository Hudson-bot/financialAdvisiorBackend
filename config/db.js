const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set('debug', true); // Enable query debugging
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      
      // Modern SSL configuration (Mongoose 6+)
      tls: true,
      tlsAllowInvalidCertificates: false, // Set to true for self-signed certs in dev
      
      // For Atlas or production:
      // tlsCAFile: require('fs').readFileSync(__dirname + '/path/to/ca.pem')
    });

    console.log(`MongoDB Connected`);
    
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

  } catch (err) {
    console.error(`MongoDB connection failed: ${err.message}`);
    console.error('Full error details:', err);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = connectDB;