//Assignment 3: Student Marks List
//--------------------------------
//Scenario : You receive marks from an exam system.

//Test data:
//const marks = [78, 92, 35, 88, 40, 67];

//Tasks:
//    1. filter() marks ≥ 40 (pass marks)
//    2. map() to add 5 grace marks to each student
//    3. reduce() to find highest mark
//    4. find() first mark below 40
//    5. findIndex() of mark 92

const marks = [78, 92, 35, 88, 40, 67];

//    1. filter() marks ≥ 40 (pass marks)
let result1=marks.filter(function(element){
    return element>=40
})
console.log(result1)

//    2. map() to add 5 grace marks to each student
let result2=marks.map(function(element){
    return element+5
})
console.log(result2)

//  3. reduce() to find highest mark
let result3=marks.reduce((accumulator,element)=>element>accumulator ? element:accumulator)
 console.log(result3)

// 4. find() first mark below 40
let result4=marks.find(element=>element<40)
console.log(result4)

// 5. findIndex() of mark 92
let result5=marks.findIndex(element=>element===92)
console.log(result5)

