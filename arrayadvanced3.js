//ASSIGNMENT 3:
//-------------
//Employee Payroll Processor

//You are building a salary processing module in a company HR app.

//Test data:
//const employees = [
//  { id: 201, name: "Amit", salary: 45000, department: "IT" },
//  { id: 202, name: "Neha", salary: 60000, department: "HR" },
//  { id: 203, name: "Rahul", salary: 75000, department: "IT" },
//  { id: 204, name: "Pooja", salary: 30000, department: "Sales" }
//];

//Tasks:
//    1. filter() employees from IT department
//    2. map() to add:
//            netSalary = salary + 10% bonus
//
//    3. reduce() to calculate total salary payout
//    4. find() employee with salary 30000
//    5. findIndex() of employee "Neha"

const employees = [
  { id: 201, name: "Amit", salary: 45000, department: "IT" },
  { id: 202, name: "Neha", salary: 60000, department: "HR" },
  { id: 203, name: "Rahul", salary: 75000, department: "IT" },
  { id: 204, name: "Pooja", salary: 30000, department: "Sales" }
];

// 1. filter() employees from IT department

let result1 = employees.filter(function(element){
    return element.department==="IT" 
})
console.log(result1)

//    2. map() to add:
//            netSalary = salary + 10% bonus

let result2 =  employees.map(function(element){
    netSalary = element.salary + (element.salary*10/100)
    return netSalary
 })
console.log(result2)

// 3. reduce() to calculate total salary payout

let result3 = employees.reduce((total, element) => total + element.salary,0);
payout=employees.salary
console.log(result3);

// 4. find() employee with salary 30000

let result4 = employees.find(function(element){
    return element.salary===30000
})
console.log(result4)

// 5. findIndex() of employee "Neha"

let result5 = employees.findIndex(function(element){
    return element.name==="Neha"
})
console.log(result5)
