
//deep copy----copy of the nested one also---there we use structuredclone
let data=100;
//create copy
let dataCopy=data;
//check
data=200;
console.log("data:",data)
console.log("dataCopy:",dataCopy)

let obj={
    a:10,
    b:20
}

//create copy X
//let copyObj=Obj;
let copyObj={...obj}

//check
obj.a=1234;
console.log("obj :",obj)
console.log("copyObj:",copyObj)


let student1={
    collegeName:"anurag university",
    collegeAddress:{
        street:"uppal",
        pincode:500098
    },
    studentAddress:{
        street:"kbhp"

    }
}

let student2={...student1}

//check
student1.collegeName="abcd"
student1.studentAddress.street='miyapur'



let product={
    productName:""
}


