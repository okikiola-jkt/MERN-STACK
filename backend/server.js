require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workout');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Use routes
app.use('/api/workout', workoutRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB & Listening on port', process.env.PORT, '!!!');
        });        
    })
    .catch((error)=>{
        console.log(error)
    })

