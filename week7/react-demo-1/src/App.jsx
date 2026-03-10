import './App.css'
//import Test1 from "./components/Test1"
//import Test2 from "./components/Test2"
//import StateDemo from "./components/StateDemo"
//import FormDemo from "./components/FormDemo"
//import RegistrationForm from "./components/RegistrationForm"
import TaskManager from './components/TaskManager';
function App(){

/*  const messages=[
    {
      message1:"good morning",
      message2:"hello",
    },
    {
      message1:"good afternoon",
      message2:"hii",
    },
    {
      message1:"good evening",
      message2:"hey",
    }
  ]
   */ 
  //return a react element
  return(
    <div className='text-center border-2 p-30 text-blue-700  bg-white '>
     {/* <h1 className="text-5xl text-blue-400" >User Registration Form</h1>*/}
    
   {/* {
      messages.map((msgObj,index)=><Test1 messages={msgObj} key={index}/>)
     }
      <Test2/>
      <StateDemo/>
      <FormDemo/>
      <RegistrationForm/>*/}
      <TaskManager/>
    </div>
  )

}

export default App;

//jsx--javascript syntax extention