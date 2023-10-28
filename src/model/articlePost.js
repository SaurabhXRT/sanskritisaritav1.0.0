const mongoose = require('mongoose');
const slugify = require('slugify');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  headingtitle: {
    type: String,
  },
  description: {
    type: String,
    required: false
  },
  keywords: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: true,
    enum: ['education', 'technology', 'politics', 'entertainment', 'other'],
  },
  article: {
    type: String,
    required: true,
  },
  postimage: {
    type: String,
    required: false,
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
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  likes: [
    {
      user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  urlTitle: {
    type: String,
    unique: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved'],
    default: 'Pending',
  },
  articleCategory: {
    type: String,
    enum: ['Normal', 'Carousel', 'Featured'],
    default: 'Normal',
  },
});

articleSchema.pre('save', function (next) {
  this.urlTitle = slugify(this.title, { lower: true });
  next();
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;


// articlepost.js

/*const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new mongoose.Schema({
  title: String,
  category: String,
  article: String,
  imagePath: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model
  createdAt: { type: Date, default: Date.now },
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;*/

