
//create HTTP server
//Import express module
import exp from 'express'
import {userApp} from "./APIs/users.js";
import {productApp} from "./APIs/product.js";
//create server
        const app=exp();
//body paesing middleware
        app.use(exp.json())
//
app.use("/user-api",userApp)
app.use("/product-api",productApp)

    //assign the port number
        app.listen(3000,()=>{
            console.log("HTTP server listening on port 3000..")
        })

        