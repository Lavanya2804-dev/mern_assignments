//make Api req
fetch('https://jsonplaceholder.typicode.com/posts')
.then(res=>res.json())
.then(date=>console.log("data is",date))
.catch(err=>console.log("err is",err))

//modern syntax to consume promise
async function getData(){
    //make Api req and get res
    let res=await fetch("https://jsonplaceholder.typicode.com/posts");
    //extract data from res
    let data = await res.json();
    console.log("data is", data);
}
getData();