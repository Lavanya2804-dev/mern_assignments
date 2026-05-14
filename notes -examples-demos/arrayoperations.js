//callback function
//    --It is a function send as argument to another function
//asynchronous means unpreditable
function test1(a){
    console.log(a)
}
//here,ananymous function is  a callback function
test1(function(){
    return 123;
})

//array operations
//----accessing
//----inserting elements dynamically
//----deleting elements dynamically
//----updating elements dynamically

let skills=['html','css','javascript']

//accessing elements(destruction)
let [skills1,skill2,skill3]=skills;
console.log(skill2)

//inserting
//at start
//to add at the starting we use the unshift method
skills.unshift('angular','java')
console.log(skills)

//at end
//to add at the ending we use push method
skills.push('python')
console.log(skills)

//in between(specific index)
//splice is used --it is powerful method--that can add,delete

skills.splice(1,0,'scala')
console.log(skills)

//delete
//delecting at stating
//we use shift method
skills.shift()
console.log(skills)

//delecting at end
//we use pop method"
skills.pop()
console.log(skills)

// delecting in between
//we use splice method
skills.splice(1,1)
console.log(skills)

//advance operations in arrays

//-----fiter(callback function)
//-----map(callback function)
//-----foreach(callback function)
//-----reduce(callback function)
//-----find(callback function)
//-----findindex(callback function)
//-----sort(callback function) && tosorted(callback function)

//filter(selection)
//filtering what ever we want
//to fiter will call callback function
//applications call the function 
// and returns to the application only
let marks=[90,70,40,89,56]

let result1=marks.filter(function(element){
    return element>70
})

//In single statement
let result2=marks.filter(element=>element>70)

console.log(result1)
console.log(result1)


//write a function that can extract marks > then 70,
//pack them into an array and return it 
marks=[90,70,40,89,56]
let empty=[]
for(let v of marks){
    if(v>70){
        empty.push(v)
    }

}
console.log(empty)

//find all marks between 30 and 90
let nums=[90,70,40,15,56]

let result3=nums.filter(function(element){
    return element<90 , element>30
})
console.log(result3)

//In single statement

let result4=nums.filter(element=>element>30 ,element=>element<90) 
console.log(result4)


//map(transform or modify)
let salaries=[100,200,300]

//add 50 for each salary
let result5=salaries.map(function(element){
    return element+50
})
console.log(result5)

let result6=salaries.map(element=>element+50)
console.log(result6)

//reduce(aggregations)
//find sum of marks
 results=marks.reduce((accumulator,element)=>accumulator+element,0)
 console.log(result4)

 //find small element of marks
 let small=marks.reduce((acc,el)=>acc<el?acc:el)
 console.log(small)

 //find element
 //find 23

 let result7=marks.find(element=>element===23)
 console.log(result7)