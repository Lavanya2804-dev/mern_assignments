import React from 'react'
import {useEffect,useState} from 'react'
import { useNavigate } from 'react-router';

function ProductsList() {

  let [products,setProducts]=useState([]);
  let [FilteredProducts,setFilteredProducts]=useState([]);
  let [search , setSearch]=useState("")
  let [loading , setLoading]=useState(true)
  let [error, setError]=useState(null)
  const navigate=useNavigate()

  //navigate to product component
  const gotoProduct=(productObj)=>{
    //navigate logic
    //while navigating ,transfer product obj too
    navigate('/product',{state:{product:productObj}})
  }

  useEffect(()=>{
    async function getProducts(){
      try{
        setLoading(true)
      let res=await fetch("https://fakestoreapi.com/products")
      if (!res.ok){
        throw new Error("failed ro fetch");
      }
        let productsData=await res.json()
        setProducts(productsData);  
        setFilteredProducts(productsData);
    }catch(err){
      setError(err)
    }finally{
      setLoading(false)

    }
  }
    getProducts()
  },[])

  const handleSearch=(e)=>{
    e.preventDefault();

    const result =products.filter((product)=>
      product.category.toLowerCase().includes(search.toLowerCase())
  );
  setFilteredProducts(result);
    }

  if(loading){
    return <p className="text-center text-2xl text-blue-300">Loading..</p>

  }

  if(error){
    return <p className="text-center text-2xl text-red-500">{error.message}</p>
  }

  return (
    <div className="p-6">
    <form onSubmit={handleSearch} className="text-center mb-8">
      <input
      type="text"
      placeholder="search by category"
      className="border p-2 rounded mr-3"
      value={search}
      onChange={(e)=>setSearch(e.target.value)} />

    <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
      Search
    </button>
    </form>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mt-10 text-center cursor-pointer">
      {
       FilteredProducts.map((productObj)=>(
      <div onClick={()=>gotoProduct(productObj)} key={productObj.id} className="shadow-md p-10 rounded-2xl">
      <img src={productObj.image}  className="h-44 object-contain block mx-auto mb-10"/>
      <p>{productObj.title}</p>
    </div>
      ))}
      </div>
      </div>
  )
}
export default  ProductsList;
