import {useForm} from 'react-hook-form'
import {useState} from 'react'

function RegistrationForm(){

    const { register, handleSubmit , formState:{errors}}=useForm();

    const [users,setUser]=useState([])

    //form submission
    const submitregister=(obj)=>{

        //the data  is not after 2020
       // setError("dob",{
       //     type:"manual",
       //     message:"DOB is after the year of 2020"
       // })
        //update users state
        setUser([...users,obj])
    }
    console.log(users)

    return(
        <div>
            <form onSubmit={handleSubmit(submitregister)}>
                <div className="mb-3">
                    <input type="text" {...register("FirstName",{required:true,minLength:4,maxLength:6})} placeholder="FirstName" className='bg-gray-300'/>
                    {
                        errors.FirstName?.type==="required" && <p className="text-red-800">firstname required</p>
                    }
                    {
                        errors.FirstName?.type==="minLength" && <p className="text-red-800">min length 4</p>
                    }
                    {
                        errors.FirstName?.type==="maxLength" && <p className="text-red-800">max length 6</p>
                    }
                </div> 
                <div className="mb-3">
                    <input type="text" {...register("LastName",{required:true,minLength:4,maxLength:6})} placeholder="LastName" className='bg-gray-300'/>
                    {
                        errors.LastName?.type==="required" && <p className="text-red-800">lastname required</p>
                    }
                    {
                        errors.LastName?.type==="minLength" && <p className="text-red-800">min length 4</p>
                    }
                    {
                        errors.LastName?.type==="maxLength" && <p className="text-red-800">max length 6</p>
                    }
                </div>
                <div className="mb-3">
                    <input type="email" {...register("email")}  placeholder="email" className='bg-gray-300'/>
                </div>
                <div className="mb-3">
                    <input type="date" {...register("dob")} placeholder="DOB" className='bg-gray-300'/>
                </div>
                <div className="mb-3">
                <input type="password" {...register("password",{required:true})}  placeholder="password" className='bg-gray-300'/>
                {
                    errors.username?.type==="required" && <p className="text-red-500">password required</p>
                }
                </div>
                <button type="submit" className='bg-yellow-400 p-3 text-black '>add new user</button>
            </form>

            {/*table*/}
            <h1 className="text-xl">FORM DATA</h1>
            <table className="table-auto w-full mt-6  border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">First name</th>
                        <th className="border px-4 py-2">Last name</th>
                        <th className="border px-4 py-2">email</th>
                        <th className="border px-4 py-2">date</th>
                        <th className="border px-4 py-2">password</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((userObj,index)=>(
                        <tr key={index}>
                            <td className="border px-4 py-2">{userObj.FirstName}</td>
                            <td className="border px-4 py-2">{userObj.LastName}</td>
                            <td className="border px-4 py-2">{userObj.email}</td>
                            <td className="border px-4 py-2">{userObj.dob}</td>
                            <td className="border px-4 py-2">{userObj.password}</td>
                        </tr>
                        ))} 
                </tbody>
            </table>
        </div>
    )
}

export default RegistrationForm;