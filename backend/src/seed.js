require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('Set MONGODB_URI in .env');
  process.exit(1);
}

const seedProducts = [
  {
    name: 'Apple iPhone 17 Pro',
    slug: 'apple-iphone-17-pro',
    description: 'Latest iPhone with A19 chip, titanium design, and advanced camera system.',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
    variants: [
      { name: '128 GB', type: 'storage', price: 89900, mrp: 99900, image: null },
      { name: '256 GB', type: 'storage', price: 99900, mrp: 109900, image: null },
      { name: '512 GB', type: 'storage', price: 119900, mrp: 129900, image: null },
      { name: 'Silver', type: 'color', price: 99900, mrp: 109900, image: null },
      { name: 'Black Titanium', type: 'color', price: 99900, mrp: 109900, image: null }
    ],
    emiPlans: [
      { tenureMonths: 3, monthlyAmount: 33300, interestRate: 0, cashback: null },
      { tenureMonths: 6, monthlyAmount: 16650, interestRate: 0, cashback: '₹1000 cashback' },
      { tenureMonths: 9, monthlyAmount: 11100, interestRate: 0, cashback: null },
      { tenureMonths: 12, monthlyAmount: 8325, interestRate: 10.5, cashback: null },
      { tenureMonths: 18, monthlyAmount: 5550, interestRate: 10.5, cashback: '₹500 cashback' },
      { tenureMonths: 24, monthlyAmount: 4163, interestRate: 10.5, cashback: null }
    ]
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-s24-ultra',
    description: 'Premium Android flagship with S Pen, 200MP camera, and AI features.',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
    variants: [
      { name: '256 GB', type: 'storage', price: 124999, mrp: 134999, image: null },
      { name: '512 GB', type: 'storage', price: 134999, mrp: 144999, image: null },
      { name: 'Titanium Gray', type: 'color', price: 124999, mrp: 134999, image: null },
      { name: 'Titanium Black', type: 'color', price: 124999, mrp: 134999, image: null },
      { name: 'Titanium Violet', type: 'color', price: 124999, mrp: 134999, image: null }
    ],
    emiPlans: [
      { tenureMonths: 3, monthlyAmount: 41666, interestRate: 0, cashback: null },
      { tenureMonths: 6, monthlyAmount: 20833, interestRate: 0, cashback: '₹1500 cashback' },
      { tenureMonths: 12, monthlyAmount: 10417, interestRate: 0, cashback: null },
      { tenureMonths: 12, monthlyAmount: 10937, interestRate: 10.5, cashback: null },
      { tenureMonths: 18, monthlyAmount: 7292, interestRate: 10.5, cashback: '₹1000 cashback' },
      { tenureMonths: 24, monthlyAmount: 5469, interestRate: 10.5, cashback: null }
    ]
  },
  {
    name: 'Google Pixel 9 Pro',
    slug: 'google-pixel-9-pro',
    description: 'Pure Android experience with best-in-class camera and Gemini AI.',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400',
    variants: [
      { name: '128 GB', type: 'storage', price: 83999, mrp: 91999, image: null },
      { name: '256 GB', type: 'storage', price: 91999, mrp: 99999, image: null },
      { name: 'Obsidian', type: 'color', price: 91999, mrp: 99999, image: null },
      { name: 'Porcelain', type: 'color', price: 91999, mrp: 99999, image: null },
      { name: 'Bay', type: 'color', price: 91999, mrp: 99999, image: null }
    ],
    emiPlans: [
      { tenureMonths: 3, monthlyAmount: 30666, interestRate: 0, cashback: null },
      { tenureMonths: 6, monthlyAmount: 15333, interestRate: 0, cashback: '₹800 cashback' },
      { tenureMonths: 9, monthlyAmount: 10222, interestRate: 0, cashback: null },
      { tenureMonths: 12, monthlyAmount: 7667, interestRate: 10.5, cashback: null },
      { tenureMonths: 18, monthlyAmount: 5111, interestRate: 10.5, cashback: null },
      { tenureMonths: 24, monthlyAmount: 3833, interestRate: 10.5, cashback: '₹500 cashback' }
    ]
  },
  {
    name: 'OnePlus 13',
    slug: 'oneplus-13',
    description: 'Flagship performance with Hasselblad camera and 100W fast charging.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    variants: [
      { name: '256 GB', type: 'storage', price: 54999, mrp: 59999, image: null },
      { name: '512 GB', type: 'storage', price: 59999, mrp: 64999, image: null },
      { name: 'Silicium Black', type: 'color', price: 54999, mrp: 59999, image: null },
      { name: 'Flowy Emerald', type: 'color', price: 54999, mrp: 59999, image: null }
    ],
    emiPlans: [
      { tenureMonths: 3, monthlyAmount: 18333, interestRate: 0, cashback: null },
      { tenureMonths: 6, monthlyAmount: 9167, interestRate: 0, cashback: '₹500 cashback' },
      { tenureMonths: 12, monthlyAmount: 4583, interestRate: 0, cashback: null },
      { tenureMonths: 12, monthlyAmount: 4808, interestRate: 10.5, cashback: null },
      { tenureMonths: 18, monthlyAmount: 3206, interestRate: 10.5, cashback: null },
      { tenureMonths: 24, monthlyAmount: 2404, interestRate: 10.5, cashback: '₹300 cashback' }
    ]
  },
  {
    name: 'Xiaomi 14 Ultra',
    slug: 'xiaomi-14-ultra',
    description: 'Leica-powered cameras and Snapdragon 8 Gen 3 for pro-grade photography.',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400',
    variants: [
      { name: '256 GB', type: 'storage', price: 79999, mrp: 84999, image: null },
      { name: '512 GB', type: 'storage', price: 89999, mrp: 94999, image: null },
      { name: 'Black', type: 'color', price: 79999, mrp: 84999, image: null },
      { name: 'White', type: 'color', price: 79999, mrp: 84999, image: null }
    ],
    emiPlans: [
      { tenureMonths: 3, monthlyAmount: 26666, interestRate: 0, cashback: null },
      { tenureMonths: 6, monthlyAmount: 13333, interestRate: 0, cashback: '₹1000 cashback' },
      { tenureMonths: 9, monthlyAmount: 8889, interestRate: 0, cashback: null },
      { tenureMonths: 12, monthlyAmount: 6667, interestRate: 10.5, cashback: null },
      { tenureMonths: 18, monthlyAmount: 4445, interestRate: 10.5, cashback: null },
      { tenureMonths: 24, monthlyAmount: 3333, interestRate: 10.5, cashback: null }
    ]
  },
  {
    name: 'Motorola Edge 40 Pro',
    slug: 'motorola-edge-40-pro',
    description: 'Curved pOLED display, 165Hz refresh rate, and 125W TurboPower charging.',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500',
    variants: [
      { name: '128 GB', type: 'storage', price: 41999, mrp: 46999, image: null },
      { name: '256 GB', type: 'storage', price: 46999, mrp: 51999, image: null },
      { name: 'Interstellar Black', type: 'color', price: 41999, mrp: 46999, image: null },
      { name: 'Lunar Blue', type: 'color', price: 41999, mrp: 46999, image: null }
    ],
    emiPlans: [
      { tenureMonths: 3, monthlyAmount: 14000, interestRate: 0, cashback: null },
      { tenureMonths: 6, monthlyAmount: 7000, interestRate: 0, cashback: '₹500 cashback' },
      { tenureMonths: 9, monthlyAmount: 4667, interestRate: 0, cashback: null },
      { tenureMonths: 12, monthlyAmount: 3500, interestRate: 10.5, cashback: null },
      { tenureMonths: 18, monthlyAmount: 2334, interestRate: 10.5, cashback: null },
      { tenureMonths: 24, monthlyAmount: 1750, interestRate: 10.5, cashback: '₹200 cashback' }
    ]
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    await Product.deleteMany({});
    await Product.insertMany(seedProducts);
    console.log('Seed data inserted. Products:', await Product.countDocuments());
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
