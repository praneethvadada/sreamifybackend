const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  genre_ids: {
    type: Array,
    required: true,
  },
  poster_path: {
    type: String,
  },
  release_date: {
    type: String,
    required: true,
  },
  vote_average: {
    type: Number,
    required: true,
  },
  mediaType: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("movies", movieSchema);
