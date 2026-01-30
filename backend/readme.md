
### Steps to create Backend
    1.Generate package.json
        npm init -y 
    2.create HTTP Server
        a.Install & import "express" module
                npm install express
        b.Import express module
                create server.js file
                    .//create HTTP server
                    .//Import express module
                            -->import exp from 'express'
                    .//create server
                            -->const app=exp()
                    .//assign the port number
                            -->app.listen(3000,()=>console.log("HTTP server listening on port 3000.."))



HTTP requests types(CRUD operations)
    GET -- read resources
    POST -- create a new resource
    PUT --update a resource
    DELETE --delete a resource

user API:

    GET http://127.0.0.1:3000/users
    POST http://127.0.0.1:3000/user
    PUT http://127.0.0.1:3000/users/<id>
    DELECT http://127.0.0.1:3000/users/<id>
    

### create products API in the same file

description of products obj:
{
    productId,
    name,
    price,
    brand
}