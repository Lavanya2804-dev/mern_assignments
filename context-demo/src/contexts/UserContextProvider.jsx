import {useState} from 'react'
import { UserContext } from './UserContext'

 function UserContextProvider({children}) {
    //state
    const [Name]=useState("Ravi");
    const [Age]=useState(20);
    const [ Email]=useState("ravi@mail.com");
    const[Update]=useState(1)
   // const [counter2,setCounter2]=useState(200);
    //function to modify the state
   
  return (
    <UserContext.Provider value={{Name,Age,Email}}>
        {children}

    </UserContext.Provider>
    
  )
}

export default UserContextProvider;
