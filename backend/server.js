const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { router: userRouter, createAdminAccount } = require('./routes/userRoutes');
const { router: resourceRouter } = require('./routes/resourceRoutes');

const app = express();

app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb://localhost:27017/studyorganizer_temp')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error:', err));

createAdminAccount();

app.use('/', userRouter);
app.use('/', resourceRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));