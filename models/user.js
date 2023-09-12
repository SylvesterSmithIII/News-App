const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const SALT_ROUNDS = 6;

const savedArticlesSchema = new Schema({
  author: String,
  title: String,
  description: String,
  url: String,
  image: String
})

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true
    },
    settings: {
      preferences: {
        sources: { type: Array },
        categories: { type: Array },
        languages: { type: Array },
        keywords: { type: Array },
        sort: { type: Array},
      },
      homePageUrl: String,
      locationInfo: {
        zipcode: Number,
        zipcodeKey: String,
        cityName: String,
        stateName: String
      }
    },
    savedArticles: [savedArticlesSchema]
  }, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.password;
            return ret;
        }
    }
  });

  userSchema.pre('save', async function(next) {
    // 'this' is the user document
    if (!this.isModified('password')) return next();
    // update the password with the computed hash
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
    return next()
  });

module.exports = mongoose.model('User', userSchema)