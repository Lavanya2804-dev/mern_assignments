/*
Assignment 1: Date Creation & Extraction (Beginner)
---------------------------------------------------
Tasks:
       1. Create a Date object for current date & time.
       2. Extract and display:
                    * Year
                    * Month (human readable)
                    * Date
                    * Day of week
                    * Hours, minutes, seconds

      3. Display the date in this format:
                    DD-MM-YYYY HH:mm:ss    */


// 1. Create Date object for current date & time
let date1 = new Date();

// 2. Extract values
let year = date1.getFullYear();
let month = date1.getMonth() + 1; // Months are 0-based
let date = date1.getDate();
let day = date1.getDay(); // 0 = Sunday
let hours = date1.getHours();
let minutes = date1.getMinutes();
let seconds = date1.getSeconds();

// Human-readable day names
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Display extracted values
console.log("Year:", year);
console.log("Month:", month);
console.log("Date:", date);
console.log("Day:", days[day]);
console.log("Time:", hours, ":", minutes, ":", seconds);

// 3. Display in DD-MM-YYYY HH:mm:ss format
date = date < 10 ? "0" + date : date;
month = month < 10 ? "0" + month : month;
hours = hours < 10 ? "0" + hours : hours;
minutes = minutes < 10 ? "0" + minutes : minutes;
seconds = seconds < 10 ? "0" + seconds : seconds;

// Final formatted date
let formattedDate = `${date}-${month}-${year} ${hours}:${minutes}:${seconds}`;

console.log("Formatted Date:", formattedDate);
