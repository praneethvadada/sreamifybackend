const router = require("express").Router();
const fetchUser = require("../middlewares/fetchUser");

const {
  addMovie,
  getMovies,
  deleteMovie,
} = require("../controllers/movieController");

router.post("/addmovie",fetchUser,   addMovie);
router.get("/getmovies", fetchUser, getMovies);
router.delete("/deletemovie/:id", fetchUser, deleteMovie);
module.exports = router;
