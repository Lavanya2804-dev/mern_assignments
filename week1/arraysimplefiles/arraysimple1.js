//Assignment 1: Daily Temperature Analyzer
//----------------------------------------
//Scenario : You are analyzing daily temperatures recorded by a weather app.

//Test data:
//const temperatures = [32, 35, 28, 40, 38, 30, 42];

//Tasks:
//   1. filter() temperatures above 35
//   2. map() to convert all temperatures from Celsius → Fahrenheit
//   3. reduce() to calculate average temperature
//  4. find() first temperature above 40
//   5. findIndex() of temperature 28

const temperatures = [32, 35, 28, 40, 38, 30, 42];

//1. filter() temperatures above 35
let temp=temperatures.filter(function(element){
    return element>35
})
console.log(temp)

//2. map() to convert all temperatures from Celsius → Fahrenheit
let fahren=temperatures.map(function(element){
    fahrenheit=(element*9/5)+32
    return element=fahrenheit
})
console.log(fahren)

//3. reduce() to calculate average temperature
let result1=temperatures.reduce((accumulator,element)=>accumulator+element,0)
let average=result1/temperatures.length
 console.log(result1)

 // 4. find() first temperature above 40
 let result2=temperatures.find(element=>element>40)
 console.log(result2)

 //   5. findIndex() of temperature 28
 let result3=temperatures.findIndex(element=>element===28)
 console.log(result3)








