/*
Assignment 3: Age Calculator (Intermediate)
-------------------------------------------
Input:
    let dob = "2000-05-15";


Tasks:
        1. Calculate exact age in years*/

// Input
let dob = "2000-05-15";

// Convert DOB string to Date object
let birthDate = new Date(dob);
let today = new Date();

// initial age
let age = today.getFullYear() - birthDate.getFullYear();

// Calculate month and date difference
let monthDiff = today.getMonth() - birthDate.getMonth();
let dayDiff = today.getDate() - birthDate.getDate();

// Adjust age if birthday has not occurred yet this year
if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
  age--;
}

// Output
console.log("Age:", age, "years");
