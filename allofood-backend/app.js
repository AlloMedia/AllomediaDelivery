const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const superadminRoutes = require('./routes/superadminRoutes');
const mongoose = require('mongoose'); // Import mongoose
require('dotenv').config();
const cors = require('cors');

// const userRoutes = require('./routes/userRoutes');
// const deliveryRoutes = require('./routes/deliveryRoutes');
// const managerRoutes = require('./routes/managerRoutes');
const superAdminRoutes = require('./routes/superAdminRoutes');

const app = express();
const PORT = process.env.PORT;

// Connect to the database (make sure this is called from your config/db.js)
require('./config/db').connect();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 600000 }
}));

// Routes:
app.use('/auth', authRoutes);
app.use('/superadmin', superadminRoutes);
// app.use('/user', userRoutes);
// app.use('/delivery', deliveryRoutes);
// app.use('/manager', managerRoutes);
app.use('/superadmin', superAdminRoutes);

// Start the server after connecting to the database
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
