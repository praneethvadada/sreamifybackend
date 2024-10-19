const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const moviesRoutes = require("./routes/movies");
require("dotenv").config({ path: "./.env" });
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.listen(3000, () => {
  console.log("Server is running on 3000 port");
});
app.use("/api/auth", authRoutes);
app.use("/api/saved", moviesRoutes); 

// const mongoUri = process.env.MONGODB_CONNECTION_LINK;

// const mongoUri =mongodb+srv://praneethvadada25:DMZy38eYUoWShVoU@cluster0.o59ta.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const mongoUri = 'mongodb+srv://praneethvadada25:DMZy38eYUoWShVoU@cluster0.o59ta.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to mongo Successful");
  } catch (error) {
    console.log(error.message);
  }
};

connectToMongo();

