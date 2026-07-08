const express=require("express");
const cors=require("cors");

require("dotenv").config();

const app=express();

app.use(cors());
app.use(express.json());

//student Routes
const studentRoutes=require("./routes/studentRoutes");

//Authentication Routes
const authRoutes=require("./routes/authRoutes");


app.use("/students",studentRoutes);
app.use("/auth", authRoutes);

app.listen(3000,()=>{

console.log(
"Server running on port 3000"
);

});