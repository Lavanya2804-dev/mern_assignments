import {useContext} from 'react'
import {CounterContext} from '../contexts/CounterContext.js'
import {UserContext} from '../contexts/UserContext.js'
import {useTest} from '../store/TestStore.js'

 function B() {

  let y=useTest((state)=>state.y)
  let incrementY=useTest((state)=>state.incrementY)

  let {counter1,counter2,changeCounter1,changeCounter2}=useContext(CounterContext)
  console.log("component B rendered")

  let {Name , Age , Email,Update}=useContext(UserContext)
    console.log("Component B")

  return (
        <div className="text-center shadow-2xl p-10">
        <p className='text-3xl'>components</p>
        <p className='text-2xl mt-10'>counter1:{counter1}</p>
        <p className='text-2xl mt-10'>counter2:{counter2}</p>
        <p className='text-2xl mt-10'>Y:{y}</p>
        <button onClick={incrementY} className="bg-blue-400 p-2 mt-10 me-10">incrementY</button>
        <button onClick={changeCounter1} className="bg-blue-400 p-2 mt-10 me-10">Change Counter</button>
        <button onClick={changeCounter2} className="bg-blue-400 p-2 mt-10">Change Counter</button>
        <p className='text-2xl mt-10'>Name:{Name}</p>
        <p className='text-2xl mt-10'>Age:{Age}</p>
        <p className='text-2xl mt-10'>Email:{Email}</p>
         <button onClick={Update} className="bg-blue-400 p-2 mt-10 ">Update</button>
    </div>
    
  )
}
export default B;
