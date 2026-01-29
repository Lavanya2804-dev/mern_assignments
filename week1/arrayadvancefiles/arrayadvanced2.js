//ASSIGNMENT 2:
//-------------
//Student Performance Dashboard

//You are working on a college result analysis system.

//Test Data:
//const students = [
//  { id: 1, name: "Ravi", marks: 78 },
//  { id: 2, name: "Anjali", marks: 92 },
//  { id: 3, name: "Kiran", marks: 35 },
//  { id: 4, name: "Sneha", marks: 88 },
//  { id: 5, name: "Arjun", marks: 40 }
//];

//Tasks:
    
//1.filter() students who passed (marks ≥ 40)
//2.map() to add a grade field
//        ≥90 → A
//        ≥75 → B
//        ≥60 → C
//        else → D
//3.reduce() to calculate average marks
//4.find() the student who scored 92
//5.findIndex() of student "Kiran"

const students = [
  { id: 1, name: "Ravi", marks: 78 },
  { id: 2, name: "Anjali", marks: 92 },
  { id: 3, name: "Kiran", marks: 35 },
  { id: 4, name: "Sneha", marks: 88 },
  { id: 5, name: "Arjun", marks: 40 }
];

//1.filter() students who passed (marks ≥ 40)
let result1=students.filter(function(element){
    return element.marks>=40
})
console.log(result1)

//2.map() to add a grade field
//        ≥90 → A
//        ≥75 → B
//        ≥60 → C
//        else → D

let result2 = students.map(function (element) {
  let grade;

  if (element.marks >= 90) {
    grade = "A";
  } else if (element.marks >= 75) {
    grade = "B";
  } else if (element.marks >= 60) {
    grade = "C";
  } else {
    grade = "D";
  }

  return {
    element,
    grade:grade
  };
});

console.log(result2);

//3.reduce() to calculate average marks

let result3 = students.reduce((total, element) => total + element.marks,0);
let averageMarks = result3 / students.length;
console.log("Average Marks:", averageMarks);

//4.find() the student who scored 92

let result4=students.find(element=>element.marks===92)
console.log(result4)

//5.findIndex() of student "Kiran"

let result5 = students.findIndex(element => element.name==="Kiran")
console.log(result5)
