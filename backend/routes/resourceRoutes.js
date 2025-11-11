const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { User } = require('./userRoutes');

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log('Created uploads folder');
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') 
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    console.log('Saving file as:', uniqueName);
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    console.log('File received:', file.originalname);
    cb(null, true);
  }
});

const resourceSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  filePath: String,
  fileName: String,
  createdAt: { type: Date, default: Date.now }
});

const Resource = mongoose.model('Resource', resourceSchema);

router.get('/resources', async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/resources', upload.single('file'), async (req, res) => {
  try {
    const { title, description, category, userEmail } = req.body;

    const user = await User.findOne({ email: userEmail });
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can add resources' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'File is required' });
    }

    const newResource = await Resource.create({
      title,
      description,
      category,
      filePath: `/uploads/${req.file.filename}`,
      fileName: req.file.originalname
    });

    res.status(201).json({ message: 'Resource added', resource: newResource });
  } catch (error) {
    console.error('Error adding resource:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/resources/:id', async (req, res) => {
  try {
    const { userEmail } = req.body;

    const user = await User.findOne({ email: userEmail });
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can delete resources' });
    }

    const resource = await Resource.findById(req.params.id);
    if (resource) {
      const filePath = path.join(__dirname, '..', resource.filePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Resource.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resource deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = { router, upload };