import {useContext} from 'react'
import {CounterContext} from '../contexts/CounterContext.js'
import {useTest} from '../store/TestStore.js'

function C() {

  //get state from store
  const {x,incrementX,decrementX}=useTest();
  console.log(x)

  let {counter1,counter2,changeCounter1,changeCounter2}=useContext(CounterContext)
  console.log("component C rendered")

  return (
    <div className="text-center shadow-2xl p-10">
        <p className='text-3xl'>components</p>
        <p className='text-2xl mt-10'>X:{x}</p>
        <button onClick={incrementX} className="bg-blue-400 p-2 mt-10 me-10">incrementX</button>
        <button onClick={decrementX} className="bg-blue-400 p-2 mt-10 me-10">decrementX</button>
         <p className='text-2xl mt-10'>counter1:{counter1}</p>
         <p className='text-2xl mt-10'>counter2:{counter2}</p>
         <button onClick={changeCounter1} className="bg-blue-400 p-2 mt-10 me-10">Change Counter</button>
         <button onClick={changeCounter2} className="bg-blue-400 p-2 mt-10 ">Change Counter</button>
        </div>
  )
}
export default C;
