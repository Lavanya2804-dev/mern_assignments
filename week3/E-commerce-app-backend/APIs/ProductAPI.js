import exp from 'express'
import {ProductModel} from '../Schemas/ProductSchema.js';
export const ProductApp=exp.Router()

//create products
ProductApp.post('/products',async(req,res)=>{
    let newProduct=req.body;
    let newProductDoc=new ProductModel(newProduct);
    console.log(newProductDoc);
    await newProductDoc.save();
    res.status(201).json({message:"Product created"})

})