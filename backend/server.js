const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Dynamic CORS configuration using the environment variable
const corsOptions = {
  origin: process.env.FRONTEND_URL,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes'); // This is likely line 25
const adminAuthRoutes = require('./routes/adminAuthRoutes');
const uploadRoutes = require('./routes/uploadRoutes');


const categoryRoutes = require("./routes/categoryRoutes");
app.use("/api/categories", categoryRoutes);



// ...
const carouselRoutes = require('./routes/carouselRoutes');
// ...

app.use('/api/carousel', carouselRoutes);
// ...


// Route Middlewares
app.use('/api/upload', uploadRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes); // This is likely line 29
app.use('/api/admin', adminAuthRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));