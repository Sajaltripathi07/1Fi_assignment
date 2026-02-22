const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find({}).select('name slug image variants').lean();
    const list = products.map(p => ({
      _id: p._id,
      name: p.name,
      slug: p.slug,
      image: p.image,
      variants: p.variants,
      minPrice: p.variants?.length ? Math.min(...p.variants.map(v => v.price)) : null,
      minMrp: p.variants?.length ? Math.min(...p.variants.map(v => v.mrp)) : null
    }));
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).lean();
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
