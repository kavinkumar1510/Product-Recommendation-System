const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const User = require("./models/User");
const Coupon = require("./models/Coupon");
const Product = require("./models/Product")
app.use(express.json({limit : "5mb"}));
app.use(cors());
mongoose
  .connect("mongodb+srv://karthi:karthi@king.zhttg3h.mongodb.net/E-commerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    const Already = await User.find({ email: email });
    console.log(Already);
    if (Already.length > 0) {
      res.send({ error: "Already User Exist" });
      return;
    }
    const NewUser = await User.create({
      email: email,
      password: password,
    });
    res.send({ success: "Register Successfully" });
  } catch (err) {
    res.send({ error: "Something Went Wrong !" });
    console.log(err);
    return;
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  try {
    const find = await User.findOne({ email: email, password: password });

    if (find) {
      console.log(find);
      res.send({ message: "Log In Successfully !" });
    } else {
      console.log("User not found");
      res.send({ error: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Something Went Wrong" });
  }
});
app.post("/product",async(req,res)=>{
  const {title,image,price} = req.body;
  try{
    const data = await Product.create({
      title:title,
      image:image,
      price : price
    })
    res.send({sucess : "ok"})
  }catch(err){
    res.send({somthing : "not ok"});
    console.log(err);
    return;
  }
})
app.get("/products",async(req,res)=>{
  try{
    const data = await Product.find({})
    console.log("products fetching .");
    res.send(data)
    
    return;
  }catch(err){
    console.log(err);
  }
})
app.get("/coupon", async (req, res) => {
  console.log("fetching . . .");
  try {
    const data = await Coupon.find({});
    console.log(data);
    res.send(data);
    return;
  } catch (err) {
    res.send({ error: "Something went wrong" });
    console.log(err);
    return;
  }
});

app.post("/coupon", async (req, res) => {
  const { data } = req.body;
  try {
    const newCoupon = await Coupon.create({
      title: data.title,
      offer: data.offer,
      code: data.code,
      expirationdate: new Date(data.date),
    });
    console.log(newCoupon);
    res.send({ success: "new Coupon added !" });
  } catch (err) {
    res.send({ error: "Something went wrong" });
    console.log(err);
    return;
  }
});
app.post("/deletecoupon",async(req,res)=>{
    const id =req.body.id;
    try{
     const del =await Coupon.deleteOne({_id : id})
     
     res.send({success :"Coupon Deleted"})
    }catch(err){
        res.send({ error: "Something went wrong" });
        console.log(err);
        return;
    }
})
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
