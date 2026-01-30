import exp from 'express'
//create mini- express(seperate route) app
export const userApp=exp.Router()

//create user Api(request handle-route)
    //test local in-memory data
    let users=[];
            //handling get reguest and send response
            //get req handling route(read users)
            userApp.get('/users',(req , res)=>{
                //send response to client
                res.status(200).json({message:"all users",payload:users})//message,payload
            })

            //Post req handling route(create users)
            userApp.post('/users',(req , res)=>{
                //get user resource from req
                let newUser=req.body;
                //console.log("new user",newUser)
                //insert newUser ito users array
                users.push(newUser);
                //send res
                res.json({message:"user created",users});
            });

            //put req handling route(update user)
            userApp.put('/users/:id',(req , res)=>{
                //send res
                //get modified user from req
                let modifiedUser=req.body;
                //console.log("modifiedUser")
                users.push(modifiedUser);
                //find the user with id exists in array
                let userIndex=users.findIndex(userObj=>userObj.id===modifiedUser.id)
                //if user not found,send res as "user not found"
                if(userIndex===-1){
                   return res.status(404).json({message:"user not found",users})
                }
                //if user found,then modify the user
                let delecteduser=users.splice(userIndex,1,modifiedUser)
                //send re as "user modified"
                res.status(200).json({message:"user modified",users})
            });

            //read user by id
            userApp.get('/users/:id',(req,res)=>{
               console.log(req.params) 
                //read id from url parameter
               let userId=Number(req.params.id)  // {id:"200"}
               //read user by this id
               let user=users.find(userObj=>userObj.id===userId)
               if(!user){
                return res.status(404).json({message:"user not found"})
               }
               //send res
               res.status(200).json({message:"user",payload:user})

            })
            //delete req handling route(delete user)
            userApp.delete('/users/:id',(req,res)=>{
                let id = Number(req.params.id);
                let userId = users.findIndex(user=>user.id===id);
                if(userId===-1) {
                    return res.status(404).json({message:"user not found"});
                }
                users.splice(userId,1);
                res.status(200).json({message:"user delected successfully",users});
            });