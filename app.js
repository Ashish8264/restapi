const express=require("express");
const mongoose=require("mongoose");
const bodyparser=require("body-parser")
const app=express();

//connect to db
mongoose.connect("mongodb://127.0.0.1:27017/product",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("connected to MongoDbB sucessfully")
  }).catch((err)=>{
    console.log(err)
  })
//middle ware
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.json());

//schema
 const productSchema= new mongoose.Schema({
    name:String,
    decription:String,
    pricre:Number,
 })
 const Product =new mongoose.model("product",productSchema)
 //creat prodect
 app.post('/api/v1/product/new',async(req,res)=>{
    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
    console.log(product);
 })
 //read 
 app.get("/api/v1/products",async(req,res)=>{
    const products=await Product.find()
    res.status(200).json({
        success:true,
        products
    })
 })
 //update
 app.put("/api/v1/product/:id", async(req,res)=>{
    let  product=await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            suceess:false,
            message:"product is not found"
        })
    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,useFindAndModify:false,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        product

    })

 }),
//delete
app.delete("/api/v1/product/:id",async (req,res)=>{
    const product =await Product.findById(req.params.body);
    if(!product){
        return res.status(500).json({
            suceess:false,
            message:"product is not found"
        })
    }
    await product.remove();
    res.status(200).json({
        suceess:true,
        message:"prduct is delte succesfully"
    })
})
 app.listen(3000,()=>{
    console.log("server is a working htttp://localhost:3000");
 })