//function decleration
function sum (a,b){
        let sum=a+b;
        return sum
}

//function calling

let result=sum(10,20)
 console.log(result)
 console.log(typeof sum)

////////////////////////////////////////

 function bigger(a,b,c){
    if (a>b && a>c){
        console.log(a)
    }
    else if (b>a && b>c){
        console.log(b)
    }
    else{
     console.log(c)
    }
 }

 bigger(10,20,30)


 //function declaration
 function findSum(a,b){
    return a+b
 }

 //function expression
 let findsum1=function(a,b){
    return a+b
 }

 //arrow function (simplify function expression)
 let findsum2=(a,b) => a+b
 
 