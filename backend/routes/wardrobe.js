const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const {
  getWardrobeItems,
  addWardrobeItem,
  deleteWardrobeItem,
  updateWardrobeItem
} = require('../controllers/wardrobeController');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// ✅ Utility function to upload image to Cloudinary
const uploadImageToCloudinary = async (file) => {
  try {
    const fileStr = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    const result = await cloudinary.uploader.upload(fileStr, { folder: 'wardrobe' });
    return {
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id
    };
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    throw new Error('Image upload failed');
  }
};

// ✅ Get all wardrobe items
router.get('/', authenticate, getWardrobeItems);

// ✅ Add new wardrobe item with image upload
router.post('/', authenticate, upload.single('image'), async (req, res, next) => {
  try {
    if (req.file) {
      const { imageUrl, cloudinaryId } = await uploadImageToCloudinary(req.file);
      req.body.imageUrl = imageUrl;
      req.body.cloudinaryId = cloudinaryId;
    }
    await addWardrobeItem(req, res, next);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add wardrobe item', message: error.message });
  }
});

// ✅ Update wardrobe item with optional image upload
router.put('/:id', authenticate, upload.single('image'), async (req, res, next) => {
  try {
    if (req.file) {
      const { imageUrl, cloudinaryId } = await uploadImageToCloudinary(req.file);
      req.body.imageUrl = imageUrl;
      req.body.cloudinaryId = cloudinaryId;
    }
    await updateWardrobeItem(req, res, next);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update wardrobe item', message: error.message });
  }
});

// ✅ Delete wardrobe item
router.delete('/:id', authenticate, deleteWardrobeItem);

module.exports = router;
