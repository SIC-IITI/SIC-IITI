import e from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import connectdb from "./config/database.js"
import User from "./models/signupSchema.js";

const PORT=5000;
const app=e();
connectdb();

app.get("/",(req,res) => {

  res.json({ status: "OK", message: "Server is running" });

})
app.use('api',User);

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);

});
