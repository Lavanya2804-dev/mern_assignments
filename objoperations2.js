//Assignment 2: Exam Result Summary
//---------------------------------
//Scenario : Marks are stored subject-wise for a student.

//Test data:
//const marks = {
//  maths: 78,
//  physics: 65,
//  chemistry: 82,
//  english: 55
//};

//Tasks:
    
//Calculate total marks
//Calculate average marks
//Find the highest scoring subject
//Add a new subject computer: 90

const marks = {
  maths: 78,
  physics: 65,
  chemistry: 82,
  english: 55
};

//Calculate total marks

let totalMarks =
  marks.maths + marks.physics + marks.chemistry + marks.english;
console.log("Total Marks:", totalMarks);

//Calculate average marks

let subjectCount = Object.keys(marks).length;
let averageMarks = totalMarks / subjectCount;
console.log("Average Marks:", averageMarks);


//Find the highest scoring subject

let highestSubject = "";
let highestMarks = 0;

for (let subject in marks) {
  if (marks[subject] > highestMarks) {
    highestMarks = marks[subject];
    highestSubject = subject;
  }
}

console.log("Highest Scoring Subject:", highestSubject);
console.log("Marks:", highestMarks);

//Add a new subject computer: 90
marks.computer = 90;
console.log(marks);
