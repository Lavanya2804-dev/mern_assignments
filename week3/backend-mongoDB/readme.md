1.Generate package.json
    npm init -y

2.create server.js

3.install,import "express" and  create HTTp server.assign port

### connect mongodb database

    REST API   ----->mongodb native driver----->       mongodb server
    REST API   ----->mongodb ODM tool[mongoose]---->   mongodb server

a.install mongoose and connect to mongodb database server
b.create schema of resources
c.create model of the schema
d.perform the DB operations on that model

Error handling


Running validators during update

.gitignore



### create product API

product obj schema:{pid,productName,price}

1.POST /products
2.GET /products
3.GET /products/<pid>
4.PUT /products/<pid>

**Inseration can be happened when we call the InsertOne,InsertMany methods and 
manually by saving in the mongoDB we can insert
**At the time Inseration,updation and the validation need to be runed otherwise no need.
**provide default error handling middleware to handle errors
**we no need toinvoke the error handling ,the express can automatically invokes the middle ware and throws the errors to middleWare then that can be handled

### Advanced concepts

    find({ } { })
          |   |
    condition projection

projection--means I want only the particular fields not all
                for ex: username :1 ->If 1->only field comes as output

unique property--To identify the particular person or thing details.
                 we will keep one field as unique

Security - saving password
            password should be hashed before saving into the database
            the hashed password only we can store in the database

user Authentication -
            every Api contains two types of routes
            the routes accessible by everyone is public routes
            the routes that are accessible by only the authenticated user       is protected user
every ApIs have 2 routers
.public
.protected
**user Auntication means submitting credentials and getting a token
**It is same as pay the money and get the token
**once ticket was received by the user then he is an authenticated user

userApi

1.verify username                       DB request       Server
2.compare plain password with           ------------>   |       |
    hashed password                     <------------   |       |
3.create JWT Token                      DB response      _______
4.send token to client app

============================================
        Steps for authentication
============================================
-->After receving credentials object of user

        1.Api will verify the username
        2.if user name is matched/valid , It compares the password
        3.if passwords are matched , It generated an encrypted token

### JSON WEB TOKEN

-once the user credentials are verified,then the logic route creates a JWT Token
-A JSON web Token have 3 parts
        --Decoded Header
        --payload

examples
Tokens--10--seconds
        "10"--milliseconds
        10d--for 10 days
        10w--10 weeks

HTTPonlycookie -- The data in the HTTPonlycookie cant be accessed by the browser
                  the server only have the access to add,or remove the data

Storage of token in browsers

    Browsers has 3 storage locations
        -local
        -session
        -cookies
**local and session storage content can be accessed by javascript of the browser
**normal cookie can also be accessible javascript of the browser
**"HTTPonly" only cookies cant be accessible by the javaScript of the browser
**so this is the safest place to store the JWT token  of the user authentication

Making Auticatication Request

**when client application make request after successful login the httponly cookie will be attached to everyrequest automatically
**the middleware in express can extract the cookie from using cookie-parser module

