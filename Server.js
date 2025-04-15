

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const storeRoutes = require('./routes/stores');
const ratingRoutes = require('./routes/ratings');
const authMiddleware = require('./middleware/auth'); // For protected routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', userRoutes); // Authentication routes (login, signup)
app.use('/api/users', authMiddleware, userRoutes); // User management routes (protected)
app.use('/api/stores', authMiddleware, storeRoutes); // Store management routes (protected)
app.use('/api/ratings', authMiddleware, ratingRoutes); // Rating routes (protected)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});