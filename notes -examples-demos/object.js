 let empObj={
    empNo:100,
    Name:'Lavanya',
    age:20
 }

 console.log(empObj.empNo)
 console.log(empObj.Name)

 for (let v in empObj)
    {
    //[v]--search for the value not key
    }
    console.log("empNo is: " ,empObj.empNo)
    console.log("name:",empObj.Name)
    console.log("age:",empObj.age)

 //create student object with properties 
 //rollno,name,age,city

 let stuObj={
   stuRollno:'23eg112a51',
   name:'Lavanya',
   age:20,
   city:'hyderabad',
 }

 for (let v in stuObj){
   console.log(stuObj[v])
 }


//create product object with properties 
// productname,brand,price

let productObj={
   prodName:'priya pickles',
   brand:'priya',
   price:500
}
for(let v in productObj){
   console.log(productObj[v])
}

//employee object
//dynamic operation is runtime.
//(it means when the program is going to be exected)

let emp={
   eno:1,
   name:"Lavanya"
}

//accessing properties
console.log(emp.eno)//1

//performing the dynamic operations
//adding new properties
emp.city='hyderabad'

//update a property
emp.eno=123;

//delect a property
delete emp.name;

//freeze the object
Object.freeze(emp)

emp.eno=12345;
emp.mobile=999999;
console.log(emp)

//read all keys
console.log(Object.keys(emp))

//read all the values
console.log(Object.values(emp))

//unpacking the objects

let test={
   a:10,
   b:20,
   c:30
}

//unpack object(destructuring)

let {a,b,c}=test;
console.log(a)
console.log(b)
console.log(c)

//complex object
let student={
   sno:100,
   peru:"Lavanya",
   marks:[90,89,86],
   address:{
      city:"hyderabad",
      pincode:55667788
   },
   getdata:function(){
      //object processing business logic
      console.log(this.marks[0])//this always refers to the current object
   },
   getaverage:function(){
      //find avg marks of the student and return
      sum=this.marks[0]+this.marks[1]+this.marks[2]
      average=sum/this.marks.length
      console.log(average)
   }
}

console.log(student.marks)
console.log(student.address.city)
console.log(student.getdata())
console.log(student.getaverage())