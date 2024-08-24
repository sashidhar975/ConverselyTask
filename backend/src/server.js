
const express = require('express');
const connectDB = require('./config/db');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',

}));

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
