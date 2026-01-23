/*Assignment 2: Date Comparison & Validation (Beginner → Intermediate)
--------------------------------------------------------------------

 Given:
      let enrollmentDeadline = new Date("2026-01-20");

Tasks:
  1.Check if:
      * Today is before deadline → "Enrollment Open"
      * Today is after deadline → "Enrollment Closed"

  2. Validate user input date:
      * Input: "2026-02-30"
      * Detect whether the date is valid or invalid  */

let enrollmentDeadline = new Date("2026-01-20");
/*1.Check if:
      * Today is before deadline → "Enrollment Open"
      * Today is after deadline → "Enrollment Closed" */
let today = new Date()
if(today < enrollmentDeadline){
    console.log("Enrollment Open")
}
else{
    console.log("Enrollment closed")
}

/* 2. Validate user input date:
      * Input: "2026-02-30"
      * Detect whether the date is valid or invalid  */

let input = "2026-02-30";
let userDate = new Date(input);

// Extract parts from input string
let [year, month, day] = input.split("-").map(Number);

// Extract parts from Date object
let realYear = userDate.getFullYear();
let realMonth = userDate.getMonth() + 1; // month is 0-based
let realDay = userDate.getDate();

// Compare input with actual parsed date
if (year === realYear && month === realMonth && day === realDay) {
  console.log("Valid Date");
} else {
  console.log("Invalid Date");
}


