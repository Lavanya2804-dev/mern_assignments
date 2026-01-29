//Assignment 2: Online Course Name Processor
//------------------------------------------
//Scenario : You are preparing a course list for display on a website.

//Test data:
//const courses = ["javascript", "react", "node", "mongodb", "express"];


//Tasks:
//  1. filter() courses with name length > 5
//    2. map() to convert course names to uppercase
//    3. reduce() to generate a single string:
//            "JAVASCRIPT | REACT | NODE | MONGODB | EXPRESS"
//
//    4. find() the course "react"
//    5. findIndex() of "node"

const courses = ["javascript", "react", "node", "mongodb", "express"];

//1. filter() courses with name length > 5
let course=courses.filter(function(element){
    programming=element.length>5
    return element=programming
})
console.log(course)

//2. map() to convert course names to uppercase
let result1=courses.map(function(element){
    upper=element.toUpperCase()
    return element=upper
})
console.log(result1)

//3. reduce() to generate a single string:
//         "JAVASCRIPT | REACT | NODE | MONGODB | EXPRESS"

let result2=courses.reduce((accumulator,element)=>accumulator+'|'+element)
 console.log(result2)

// 4. find() the course "react"

let result3=courses.find(element=>element==="react")
 console.log(result3)

// 5. findIndex() of "node"

let result4=courses.findIndex(element=>element==="node")
 console.log(result4)