/*### create product API

product obj schema:{pid,productName,price}

1.POST /products
2.GET /products
3.GET /products/<pid>
4.PUT /products/<pid></pid>*/

import exp from 'express'
import {ProductModel} from '../schemas/ProductSchema.js'
export const ProductApp=exp.Router()


//create products
ProductApp.post('/products',async(req,res)=>{
    let newProduct=req.body;
    let newProductDoc=new ProductModel(newProduct);
    console.log(newProductDoc);
    await newProductDoc.save();
    res.status(201).json({message:"Product created"})

})
//read product
ProductApp.get('/products',async(req,res)=>{
    //read products
    let productsList=await ProductModel.find()
    res.status(200).json({message:"products",payload:productsList})
})

//read product by ObjectId
ProductApp.get("/Products/:id",async(req,res)=>{
    //get product id from req params
    let objId=req.params.id;
    //fetch product from db by id
    let ProductObj=await ProductModel.findById(objId)
    //send res
    res.status(200).json({message:"user",payload:ProductObj})
})

//update Product
ProductApp.put("/Products/:id",async(req,res)=>{
    //get objectId from the url params
    let objId=req.params.id
    //get modified product from req
    let modifiedProduct=req.body
    //make update
    let latestProduct = await ProductModel.findByIdAndUpdate(objId,{$set:{...modifiedProduct}},{new:true})
    //send res
    res.status(200).json({message:'Product updated',payload:'latestProduct'});
})