const pool = require('../config/db');

exports.getWardrobeItems = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM wardrobe');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.addWardrobeItem = async (req, res) => {
  const { name, category, image_url } = req.body;

  try {
    await pool.query(
      'INSERT INTO wardrobe (name, category, image_url) VALUES (?, ?, ?)',
      [name, category, image_url]
    );
    res.status(201).json({ message: 'Item added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.deleteWardrobeItem = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM wardrobe WHERE id = ?', [id]);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
