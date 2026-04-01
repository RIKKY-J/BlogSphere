import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the post'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: [true, 'Content cannot be empty'],
  },
  category: {
    type: String,
    required: true,
    enum: ['tech', 'lifestyle', 'business', 'design', 'general'],
    default: 'general',
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
