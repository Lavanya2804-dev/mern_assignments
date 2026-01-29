/*MODULE 4: ROLE & PERMISSION ENGINE
  -> Get all role names
  -> Check if student can delete
  -> Create a flat list of all unique permissions
  -> Add new role moderator immutably*/

  import {users,courses,cart,roles} from './data.js'

//-> Get all role names
let roleNames = Object.keys(roles);
console.log(roleNames)

//-> Check if student can delete
let studentCanDelete =(student=>student==="delete");
let studel = studentCanDelete();
console.log(studel)

//-> Create a flat list of all unique permissions
let uniquePermissions = [...new Set(Object.values(roles).flat())];
console.log(uniquePermissions)

//-> Add new role moderator immutably

let addModeratorRole = {roles,moderator: ["update", "view"]};
console.log(addModeratorRole)



