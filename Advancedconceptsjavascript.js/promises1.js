//ravi made promise to kiran that he will call him after 10 mins
console.log("ravi made a promise to kiran that he will call him after 5 sec")
console.log("kiran is waiting...")

let furtureVaialability=true;
//create promise(kiran)
let promiseobj=new Promise((fullfilled,rejected)=>{
    setTimeout(()=>{
        if(furtureVaialability===true){
            fullfilled("hello frnd..how are you")
        }else{
            rejected("sorry..i will call you later")
        }

    },5000);
})

//consume promise(ravi)
promiseobj.then((message)=>     //then is called when promise if fulfilled
    {console.log("fillfulled:",message); })
.catch((error)=>{               //catch is called when promise is rejected
    console.log("rejected:",error);
});

console.log("hello")//this is to show that its synchronous as it does not wait
//for promise to be rejected or promise to be fulfilled befor printing hello


//moren way to consume promise(asyn & await)
//asyn function consumePromise(){
//    let res=await
//}