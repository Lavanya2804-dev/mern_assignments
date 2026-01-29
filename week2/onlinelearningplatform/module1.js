
/*TASKS
------
MODULE-1 :USER PROCESSING ENGINE
  -> Get only active users
  -> Extract names of active users
  -> Check if any admin exists
  -> Find user by id
  -> Deactivate a user immutably */

  import {users} from './data.js'

  //-> Get only active users
  let activeUsers = users.filter(user => user.active);

  //-> Extract names of active users
  let activeUserNames = activeUsers.map(user => user.name);

  //-> Check if any admin exists
  let adminExists = users.some(users => users.role === "admin");
  
  //-> Find user by id
  let id=1
  let findUserById = users.find(users => users.id === id);

  //-> Deactivate a user immutably
  let id1=2
  let deactivateUser = users.map(user =>user.id === id1 ?{ ...user, active: false } : user);


  console.log(activeUsers)
  console.log(activeUserNames)
  console.log(adminExists)
  console.log(findUserById)
  console.log(deactivateUser)

