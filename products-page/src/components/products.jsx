import React from "react";
import Product from "./Product";

function Products() {

  const myProducts = [
    {
      productId: 1,
      name: "AirPods Pro",
      price: 249,
      brand: "Apple",
      description: "Active noise cancellation with adaptive transparency mode.",
      image: "https://picsum.photos/seed/airpodspro/400/400",
    },
    {
      productId: 2,
      name: "Galaxy Watch 6",
      price: 299,
      brand: "Samsung",
      description: "Advanced health monitoring with 40 hour battery life.",
      image: "https://picsum.photos/seed/galaxywatch/400/400",
    },
    {
      productId: 3,
      name: "MX Master 3S",
      price: 99,
      brand: "Logitech",
      description: "Ultra-fast scrolling and ergonomic design.",
      image: "https://picsum.photos/seed/mxmaster/400/400",
    },
    {
      productId: 4,
      name: "MacBook Air M3",
      price: 1299,
      brand: "Apple",
      description: "Supercharged by M3 chip with 18-hour battery life.",
      image: "https://picsum.photos/seed/macbookair/400/400",
    },
    {
      productId: 5,
      name: "Sony WH-1000XM5",
      price: 349,
      brand: "Sony",
      description: "Industry-leading noise cancellation with 30-hour battery.",
      image: "https://picsum.photos/seed/sonywh/400/400",
    },
    {
      productId: 6,
      name: "iPad Mini 6",
      price: 499,
      brand: "Apple",
      description: "Portable powerhouse with A15 Bionic chip.",
      image: "https://picsum.photos/seed/ipadmini/400/400",
    },
    {
      productId: 7,
      name: "Mechanical Keyboard K3",
      price: 89,
      brand: "Keychron",
      description: "Compact wireless mechanical keyboard with RGB.",
      image: "https://picsum.photos/seed/keychron/400/400",
    },
    {
      productId: 8,
      name: "Dell UltraSharp 27\"",
      price: 579,
      brand: "Dell",
      description: "4K IPS display with factory-calibrated color accuracy.",
      image: "https://picsum.photos/seed/dellultra/400/400",
    },
    {
      productId: 9,
      name: "Pixel 8 Pro",
      price: 999,
      brand: "Google",
      description: "Google AI built-in with pro-level camera system.",
      image: "https://picsum.photos/seed/pixel8pro/400/400",
    },
    {
      productId: 10,
      name: "Portable SSD T9",
      price: 119,
      brand: "Samsung",
      description: "Blazing-fast 2000MB/s transfer speeds.",
      image: "https://picsum.photos/seed/samsungssd/400/400",
    },
  ];

  return (
    <div className="p-10 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-10">Our Tech Shop</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {myProducts.map(function (item) {
          return <Product key={item.productId} product={item} />;
        })}
      </div>
    </div>
  );
}

export default Products;