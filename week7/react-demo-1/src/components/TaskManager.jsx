import AddTask from "./AddTask"
import TaskCount from "./TaskCount"
import TaskList from "./TaskList"
import {useState} from "react"



function TaskManager() {

    let [tasks, setTasks]=useState([])

    //add new task
    const addNewTask=(taskObj)=>{
        setTasks([...tasks,taskObj])
    }
  return (
    <div>
       <h1 className='text-3xl text-blue-300 mb-10 '>TaskManager</h1> 
       <div className="flex justify-around">
       <AddTask addNewTask={addNewTask}/>
       <TaskList tasks={tasks}/>
       <TaskCount tasks={tasks}/>
        </div>
    </div>
  );
}

export default TaskManager