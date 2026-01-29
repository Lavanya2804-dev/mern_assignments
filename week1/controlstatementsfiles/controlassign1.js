//smart login status engine
//HANDS ON 1: Smart Login Status Engine
//      Intial Data:
//            let isLoggedIn=true;
//            let isProfileComplete=false;
//        Tasks:
//            1.If user is not logged in = show "please login"
//            2.If logged in but profile incomplete =  show "complete your profile"
//            3.If logged in and profile complete = show "Welcome back"
//            4.Store the result in a message
//            5.Print the message
let islogin=true
let isprofile=false

function smartlogin(){

if (islogin==false) {
    console.log("please login")
}

else if(islogin==true && isprofile==true && isprofile==false) {
    console.log("complete the profile")
}

else{
    console.log("welcome back")
}
}

smartlogin()
