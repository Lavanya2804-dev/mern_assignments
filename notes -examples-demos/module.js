//a modeule can export data , arrays etc..
//module can have maximum of one default export but have mutilple named exports
//module makes files allow to share or import data with others but files cannot.
 let a=100;
//default export
export default a;

//named export
 let b=200;
 let marks=[90,80]
 let address={
    city:"hyd",
    pincode:9999
 }

 export{b, marks,address}
//-------------------------------------------------------------------
//import
import x from './module1.js' //./currect working directory
import {b,marks,address} from './module1.js'

console.log("x is ",x)
console.log("b is ", b)
console.log(b,marks,address)