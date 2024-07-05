import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  code: { type: String, required: true },
  product_name: { type: String, required: true },
  image_url: { type: String, required: true },
});

export default mongoose.models.Favorite || mongoose.model('Favorite', favoriteSchema);
