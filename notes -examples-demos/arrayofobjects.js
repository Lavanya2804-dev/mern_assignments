//students(array of objects)
let students = [
    {sno: 1, nam:"Lakshmi", age:21},
    {sno: 2, nam:"Lavanya", age:22},
    {sno: 3, nam:"sunitha", age:18},
    {sno: 4, nam:"madhava", age:48},
];

//find students age lee then 20
let result1=students.filter(studentObj=>studentObj.age<20)
console.log(result1)

//increment age by 2 years for sunitha
let result2=students.map(studentObj=>{
    if(studentObj.nam==='sunitha'){
        return {
            sno:studentObj.sno,
            name:studentObj.nam,
            age:studentObj.age+2,
        }
    }
    return studentObj;
})
console.log(result2)

//find the sum of ages of all stuedents
let sumofage=students.reduce((acc,stuObj)=>acc+stuObj.age,0)
console.log(sumofage)