const mongoose = require("mongoose");

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://prabalarora2001:4DZlfb5yjMzHEsfy@cluster0.le2kysk.mongodb.net/tododb",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectDB;
