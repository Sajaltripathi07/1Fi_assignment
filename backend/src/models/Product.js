const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  image: { type: String }
}, { _id: true });

const emiPlanSchema = new mongoose.Schema({
  tenureMonths: { type: Number, required: true },
  monthlyAmount: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  cashback: { type: String }
}, { _id: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  image: { type: String, required: true },
  variants: [variantSchema],
  emiPlans: [emiPlanSchema]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
