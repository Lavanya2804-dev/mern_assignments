//syn or Asyn both are executed by the JS engine only
/*Asynchronous hand over the work for the node or web Js for a particular requied.
After the required time completed .then the event loop take  the task and call the 
JS engine and then executed.*/
/* In mean time the JS execute the other intructions*/
//members ordered food 
//person-1 orderded biryani(5sec)
console.log("person-1 orderded biryani");//--->nonblocking synchronous

setTimeout(()=>{        //-->blocking Asynchronous
    console.log("person-1 received biryani")
},5000);

//person-2 ordered curd rice(2sec)
console.log("person-2 orderded curd rice")//--->nonblocking synchronous

setTimeout(()=>{        //-->blocking Asynchronous
    console.log("person-2 received curd rice")
},2000);

//person-3 ordered water bottle(1 sec)
console.log("person-3 orderded water bottle")//--->nonblocking synchronous

setTimeout(()=>{         //-->blocking Asynchronous
    console.log("person-3 received water bottle")
},1000);

console.log("hello")

