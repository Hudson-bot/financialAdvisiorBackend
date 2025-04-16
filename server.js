require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const contactRoutes = require("./routes/contactRoutes");


const app = express();

// Middleware
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));
app.use(cors()); 
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/contact", contactRoutes); 

// Database connection
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});