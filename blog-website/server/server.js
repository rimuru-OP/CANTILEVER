const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const postRoutes = require("./routes/postRoutes");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("MongoDB connected"))
    .catch((err)=>console.log(err));
    
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/posts", postRoutes);

app.get("/", (req, res)=>{
    res.send("API running");
})

const PORT = 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`);
})
