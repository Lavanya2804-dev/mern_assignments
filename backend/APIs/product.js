import exp from 'express'
export const productApp=exp.Router()
/*### create products API in the same file

description of products obj:
{
    productId,
    name,
    price,
    brand
}*/

//create user Api(request handle-route)
    //test local in-memory data
    let products=[];
            //handling get reguest and send response
            //get req handling route(read users)
            productApp.get('/products',(req , res)=>{
                //send response to client
                res.status(200).json({message:"all products",payload:products})//message,payload
            })

//Post req handling route(create users)
            productApp.post('/products',(req , res)=>{
                //get user resource from req
                let newProduct=req.body;
                //console.log("new user",newUser)
                //insert newUser ito users array
                products.push(newProduct);
                //send res
                res.json({message:"producted created",products});
            });

//put req handling route(update user)
            productApp.put('/products/:productId',(req , res)=>{
                //send res
                //get modified user from req
                let modifiedproduct=req.body;
                //console.log("modifiedUser")
                products.push(modifiedproduct);
                //find the product with id exists in array
                let productIndex=products.findIndex(productObj=>productObj.productId===modifiedproduct.productId)
                //if product not found,send res as "product not found"
                if(productIndex===-1){
                   return res.status(404).json({message:"product not found"})
                }
                //if user found,then modify the product
                let delectedproduct=products.splice(productIndex,1,modifiedproduct)
                //send re as "product modified"
                res.status(200).json({message:"product modified",products})
            });
            //read user by id
                productApp.get('/products/:productId',(req,res)=>{
               //console.log(req.params) 
                //read id from url parameter
               let productId=Number(req.params.productId)  // {id:"200"}
               //read user by this id
               let product=products.find(productObj=>productObj.productId===productId)
               if(!product){
                return res.status(404).json({message:"product not found"})
               }
               //send res
               res.status(200).json({message:"product",payload:product})

            })
            //delete req handling route(delete user)
            productApp.delete('/products/:productId',(req,res)=>{
                let productId = Number(req.params.productId);
                let productIndex = products.findIndex(product=>product.productId===productId);
                if(productIndex===-1) {
                    return res.status(404).json({message:"product not found"});
                }
                products.splice(productIndex,1);
                res.status(200).json({message:"product delected successfully",products});
            });