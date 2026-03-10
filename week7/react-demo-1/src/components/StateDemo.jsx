import { useState } from "react";

function StateDemo() {
    let [counter, setCounter] = useState(10);
    let[marks,setMarks]=useState([1,2,3]);
    let [user,setuser]=useState({email:"test@gmail.com"})

    let increment = () => {
        setCounter(counter + 1);
    };

    let decrement = () => {
        setCounter(counter - 1);
    };

    let reset = () => {
        setCounter(0);
    };
  //update marks satte by inserting elements in 
  // the begining
  const beginMarks=()=>
    {
        setMarks([100,...marks]);
    };
  //,at ending 
  const addMarks =()=>
    {
        setMarks([...marks,123]);
    };
  //in between with index
  const updateMarksAtIndex=()=>
    {
        setMarks([...marks.slice(0,2),100,...marks.slice(2)]);
    };
  //delete marks at the end of the array
  const deleteMarks=()=>
    {
        setMarks(marks.slice(0,marks.length-1));
    };

    const updateUser=()=>
    {
        setuser({...user,city:"Pune"});
        //user.city="Pune";
        //setuser(user);  this will modify but will not re-render
    }

    //delete a property
    const deleteProperty = () =>{
        const{age:_, ...rest} = user;
        setuser(rest);
    }

    return (
        <div>
            <p className="text-4xl mt-10">Counter: {counter}</p>
            <div className="space-x-4">
            <button onClick={increment} className="bg-indigo-200 px-5 py-2 mt-5">+</button>
            <button onClick={decrement} className="bg-indigo-200 px-5 py-2 mt-5">-</button>
            <button onClick={reset} className="bg-indigo-300">Reset</button>

            <h1>Marks</h1>
            {marks.map((m,index)=>
            {
                return <p key={index}>{m}</p>;
            })}
            <button onClick={addMarks} className="bg-indigo-200 px-5 py-2 mt-5">Add Marks at end </button>

            <h1></h1>
            <p>{user.email}</p>
            <p>{user.city}</p>
            <button onClick={updateUser} className="bg-indigo-200 px-5 py-2 mt-5">Update</button>

            <button onClick={beginMarks} className="bg-indigo-200 px-5 py-2 mt-5"> Add Marks at Beginning</button>
            <button onClick={updateMarksAtIndex} className="bg-indigo-200 px-5 py-2 mt-5">Update Marks At Index</button>
            <button onClick={deleteMarks} className="bg-indigo-200 px-5 py-2 mt-5">Delete Marks At End</button>
            <button onClick={deleteProperty} className="bg-indigo-200 px-5 py-2 mt-5">Delete property</button>
            </div>
        </div>
    );
}

export default StateDemo;