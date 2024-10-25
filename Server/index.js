const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
const todoroute = require("./routes/todoroute");
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/todos", todoroute);

app.get("/",(req,res)=>{
    res.send("hello,this is backend");
}
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
