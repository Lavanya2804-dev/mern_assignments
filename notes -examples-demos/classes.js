//classes are used to define user new datatype
//only two access specifiors---public , private
//to represent private we use #
//methods are always called on the object

//create 100 person object
//create the person data
class person{
    pid;
    Age;
    static collegeName;
//methods

static{
    person.collegeName='Anurag'
}
constructor(pid, age){
    this.pid = pid;
    this.Age =age;
}

getpersonData(){
    console.log(this.pid, this.Age);
}
}

//create  objects of person 
