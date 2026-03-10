import {useForm} from 'react-hook-form'

function FormDemo(){

    const { register, handleSubmit , formState:{errors}}=useForm();

    //form submission
    const submitForm=(data)=>{
        console.log(data);
    }

    return(
        <div>
            <h1>form</h1>
            <form onSubmit={handleSubmit(submitForm)}>
                <div className="mb-3">
                    <input type="text" {...register("username",{required:true,minLength:3})} placeholder="username" className='bg-amber-200'/>
                    {
                        errors.username?.type==="required" && <p className="text-red-500">name required</p>
                    }
                    {
                        errors.username?.type==="minLength" && <p className="text-red-500">min length 3</p>
                    }
                </div> 
                <div className="mb-3">
                    <input type="email" {...register("email")}  placeholder="email" className='bg-amber-200'/>
                </div>
                <div className="mb-3">
                <input type="password" {...register("password",{required:true})}  placeholder="password" className='bg-amber-200'/>
                {
                    errors.username?.type==="required" && <p className="text-red-500">password required</p>
                }
                </div>
                <button type="submit" className='bg-blue-400 p-3 text-lime-100'>Login</button>
            </form>
        </div>
    )
}

export default FormDemo;