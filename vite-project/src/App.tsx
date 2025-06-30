import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {useEffect} from "react"

function App() {  
  const [product,setProduct]=useState([]);
  const [data,setData]=useState([]);
  const [count,setCount]=useState();
  const [search,setSearch]=useState();

  useEffect(()=>{
    fetch("https://fakestoreapi.com/products").then((res)=>res.json()).then((dat)=>{setProduct(dat)
      setData(dat)
    });
  },[])


  function writeOnSearch(e){
      let searchText = e.target.value.toLowerCase();

  const filteredData = product.filter((element) => 
    element.title.toLowerCase().includes(searchText)
  );

  setData(filteredData);

  }
  function handleListCount(e){
   const selectedValue = e.target.value;

  if (selectedValue === "All") {
    setData(product);
    setCount(selectedValue);
    return;
  }

  const limit = Math.min(Number(selectedValue), product.length);

  const arr = product.slice(0, limit);
  setData(arr);
  setCount(selectedValue);
  }

  return (
    <>
  <div className="p-6 max-w-6xl mx-auto">
    {/* Search Input */}
    <input
      type="text"
      value={search}
      onChange={writeOnSearch}
      placeholder="Search products..."
      className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
    />

    {/* Dropdown */}
    <select
      value={count}
      onChange={handleListCount}
      className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
    >
      <option value="All">All</option>
      <option value="5">5</option>
      <option value="15">15</option>
      <option value="25">25</option>
    </select>

    {/* Product Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data.map((product, index) => (
        <div
          key={index}
          className="border rounded shadow hover:shadow-lg transition p-4 flex flex-col items-center"
        >
          <img
            src={product.image}
            alt={product.title}
            className="h-48 w-48 object-contain mb-4"
          />
          <h2 className="font-semibold text-lg text-center mb-2">{product.title}</h2>
          <p className="text-green-600 font-bold mb-1">${product.price}</p>
          <p className="text-sm text-gray-600">{product.category}</p>
        </div>
      ))}
    </div>
  </div>
</>

  )
}

export default App
