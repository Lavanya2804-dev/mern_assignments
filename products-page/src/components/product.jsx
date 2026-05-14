import React from "react";

function Product(props) {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      {/* Product Image */}
      <img 
        src={props.product.image} 
        alt={props.product.name} 
        className="w-full h-48 object-cover rounded-md" 
      />

      {/* Product Name */}
      <h2 className="text-xl font-bold mt-2">{props.product.name}</h2>

      {/* Brand */}
      <p className="text-blue-600 font-semibold">{props.product.brand}</p>

      {/* Description */}
      <p className="text-gray-600 text-sm my-2">{props.product.description}</p>

      {/* Price */}
      <div className="text-lg font-bold text-green-600">
        ${props.product.price}
      </div>
      
      <button className="w-full bg-blue-500 text-white mt-3 py-2 rounded hover:bg-blue-600">
        Buy Now
      </button>
    </div>
  );
}

export default Product;