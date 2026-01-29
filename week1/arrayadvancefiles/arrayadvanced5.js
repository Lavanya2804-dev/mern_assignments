//ASSIGNMENT 5: 
//-------------
//Bank Transaction Analyzer

//You are building a bank statement summary.

//Test data:
//const transactions = [
//  { id: 1, type: "credit", amount: 5000 },
//  { id: 2, type: "debit", amount: 2000 },
//  { id: 3, type: "credit", amount: 10000 },
//  { id: 4, type: "debit", amount: 3000 }
//];


//Tasks:
//    1. filter() all credit transactions
//    2. map() to extract only transaction amounts
//    3. reduce() to calculate final account balance
//    4. find() the first debit transaction
//    5. findIndex() of transaction with amount 10000

const transactions = [
  { id: 1, type: "credit", amount: 5000 },
  { id: 2, type: "debit", amount: 2000 },
  { id: 3, type: "credit", amount: 10000 },
  { id: 4, type: "debit", amount: 3000 }
];

//    1. filter() all credit transactions

let result1 = transactions.filter(function(element){
    return element.type==="credit" 
})
console.log(result1)

//    2. map() to extract only transaction amounts

let result2 =  transactions.map(function(element){
    return element.transactions==="amounts"

 })
console.log(result2)

//    3. reduce() to calculate final account balance

let result3 = transactions.reduce((total, element) => total + element.amount,0);
finalbal=transactions.amount
console.log(result3);

//    4. find() the first debit transaction

let result4 = transactions.find(function(element){
    return element.type==="debit"

})
console.log(result4)

//    5. findIndex() of transaction with amount 10000

let result5 = transactions.findIndex(function(element){
    return element.amount===10000
})
console.log(result5)