const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes'); 

const app = express();
app.use(express.json());

// didnt want to share my db information
const DB_CONNECTION = 'my user and password';
mongoose.connect(DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log('Successful Mongodb connection');
}).catch(err => {
    console.log('Error in Mongodb connection');
});

// user route
app.use('/users', userRoutes);  

app.listen(8081, () => { 
    console.log('Server is running'); 
});