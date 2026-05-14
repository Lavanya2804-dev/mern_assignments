//Api----application program interface

let student={
    sno:1,
    Name:'ravi',
    age:19
}
console.log(typeof student)

/*let studentJson={
    "sno":1,
    "name":"ravi",
    "age":19
}*/

//Js Obj to Json
let studentJson=JSON.stringify(student)
console.log( studentJson)
console.log(typeof studentJson)