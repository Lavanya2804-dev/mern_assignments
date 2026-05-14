let results=[90,87,89,67,56]
let skills=['html','javascript','anguler']

console.log(results[0])
//if we try to access the out of the index in the array.
//we wont get the error like other languages.
// we get undefined in the js. 
console.log(results[10])

//syntax of for loop in js

for(let v of results) {
  console.log(v)
}

//no need to write any exit words for forloop in js
//index based it is not useful

let marks=[a=90,b=87,c=89,d=67,e=56]
for(let v of marks){
    sum=a+b+c+d+e
}
console.log("the sum is:",sum)

////////////////////////////

function smaller(a,b,c,d,e){
    if (a<b && a<c && a<d && a<e){
        console.log(a)
    }
    else if (b<a && b<c && b<d && b<e){
        console.log(b)
    }
    else if(c<a && c<b && c<d && c<e){
        console.log(c)
    }
    else if(d<a && d<b && d<c && d<e){
        console.log(d)
    }
    else{
     console.log(e)
    }
 }

 smaller(90,87,89,67,56)
 
//////////////////////////////////////

//.write a function that recevies "skills" array and "skillname"
//as argumruments and return the index if "skillname" existed, otherwise
//"skill not found"
let programs=["html","css","js","python"]
function language(programs){
        if(programs==true){
            console.log(programs)
        }
        else
        {
            console.log("skill not found.")
        }
}
language=(programs, c)

