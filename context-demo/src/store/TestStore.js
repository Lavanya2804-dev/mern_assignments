import {create} from 'zustand'

//create store
export const useTest=create((set)=>({
    //state
    x:10,
    y:20,
    user:{
        name:"vikas",
        age:21
    },
    //functions to modify state
    incrementX:()=>set((state)=>({x:state.x+1})),
    decrementX:()=>set((state)=>({x:state.x-1})),
    incrementY:()=>set((state)=>({y:state.y+1})),
    incrementByValue:(v)=>(state=>({x:state.x+v})),
    updateUser:(newName)=>set(state=>({user:{...state.user,age:30,name:newName}}))
}))