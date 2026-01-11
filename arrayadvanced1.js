//ASSIGNMENT 1:
//-------------
//You are building a shopping cart summary for an e-commerce website.

//Test Data : 
//const cart = [
//  { id: 101, name: "Laptop", price: 60000, quantity: 1, inStock: true },
//  { id: 102, name: "Mouse", price: 800, quantity: 2, inStock: true },
//  { id: 103, name: "Keyboard", price: 1500, quantity: 1, inStock: false },
//  { id: 104, name: "Monitor", price: 12000, quantity: 1, inStock: true }
//];

//Tasks:
    
//Use filter() to get only inStock products
//Use map() to create a new array with:  { name, totalPrice }
//Use reduce() to calculate grand total cart value
//Use find() to get details of "Mouse"
//Use findIndex() to find the position of "Keyboard"

const cart = [
  { id: 101, name: "Laptop", price: 60000, quantity: 1, inStock: true },
  { id: 102, name: "Mouse", price: 800, quantity: 2, inStock: true },
  { id: 103, name: "Keyboard", price: 1500, quantity: 1, inStock: false },
  { id: 104, name: "Monitor", price: 12000, quantity: 1, inStock: true }
];

//Use filter() to get only inStock products

let result1=cart.filter(function(element){
    return element.inStock
})
console.log(result1)

//Use map() to create a new array with:  { name, totalPrice }

let result2=cart.map(element => ({
  name:element.name,
  totalPrice: element.price * element.quantity
}));
console.log(result2);

//Use reduce() to calculate grand total cart value

let result3 = cart.reduce((total,element) =>total + element.price*element.quantity,0);
console.log( "the grandtotal is:",result3);

//Use find() to get details of "Mouse"

let result4=cart.find(element=>element.name==="Mouse")
console.log(result4)

//Use findIndex() to find the position of "Keyboard"

let result5 = cart.findIndex(element => element.name === "Keyboard");
console.log(result5);
