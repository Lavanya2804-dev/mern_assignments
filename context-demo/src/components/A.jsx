import {useContext,useRef,useEffect} from 'react'
import {CounterContext} from '../contexts/CounterContext.js'
import {UserContext} from '../contexts/UserContext.js'
function A() {

  let inputRef=useRef(null)

  let {counter1,changeCounter1 , counter2 , changeCounter2}=useContext(CounterContext)
  console.log("component A rendered")

  let {Name , Age , Email,Update}=useContext(UserContext)
  console.log("Component A")

useEffect(()=>{
  inputRef.current.focus()
},[])
  return (
    <div className="text-center shadow-2xl p-10">
        <p className='text-3xl'>components</p>
        <p className='text-2xl mt-10'>counter1:{counter1}</p>
        <p className='text-2xl mt-10'>counter2:{counter2}</p>
        <button onClick={changeCounter1} className="bg-blue-400 p-2 mt-10 me-10">Change Counter</button>
        <button onClick={changeCounter2} className="bg-blue-400 p-2 mt-10 ">Change Counter</button>
        <p className='text-2xl mt-10'>Name:{Name}</p>
        <p className='text-2xl mt-10'>Age:{Age}</p>
        <p className='text-2xl mt-10 me-10'>Email:{Email}</p>
          <button onClick={Update} className="bg-blue-400 p-2 mt-10 me-10">Update</button>
        <input ref={inputRef} type="text" placeholder="entername"/>
    </div>
  )
}

export default A;
