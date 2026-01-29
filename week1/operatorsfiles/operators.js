let a=10
let b=5

console.log(a==b)//common equality
console.log(a===b)//strict equality

//strict equality always first checks the data and then answer it
//compares the values not datatypes

//Initial data:
//      let totalAmount = 0;

//🎯 Tasks
//  1. Add ₹500 to the total
//  2. Add ₹1200 to the total
//  3. Apply a ₹200 discount
//  4. Add 18% GST
//  5. Print the final bill amount

 // Initial data
let totalAmount = 0;

// 1. Add ₹500 to the total
totalAmount += 500;
console.log(totalAmount);

// 2. Add ₹1200 to the total
totalAmount += 1200;
console.log(totalAmount);

// 3. Apply a ₹200 discount
totalAmount -= 200;
console.log(totalAmount);

// 4. Add 18% GST
totalAmount += totalAmount * 0.18; 
console.log( totalAmount.toFixed(2));

// 5. Print the final bill amount
console.log( totalAmount.toFixed(2));
