//HANDS ON 2: Course Price Tag Labelex
//           Intial Data:
//                let price = 1299;
//            Tasks:
//                1.If price<500 -> "Budget Course"
//                2.If price between 500-1000 -> "Standard Course"
//                3.If price > 1000 -> "Premium Course"
//                4.Store label in courseTag
//                5.print the Label


let price=1299

function coursePrice(){
    if(price<500){
        console.log("Buget course")
    }
    else if(price>500 && price<1000){
        console.log("Standard Course")
    }
    else if(price>1000){
        console.log("Premium Course")
    }

}
coursePrice()