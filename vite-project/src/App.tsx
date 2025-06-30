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
    <div>
      <input type="text"  value={search} onChange={writeOnSearch}/>
      <select value={count} onChange={(e)=>handleListCount(e)} name="" id="">
        <option value="All">All</option>
        <option value="5">5</option>
        <option value="15">15</option>
        <option value="25">25</option>
      </select>
      <div class="grid grid-cols-3 gap-4">
      {
        
        data.map((products,key)=>(
          <>
          
              <div key={key} >
                <img
                style={{height:200,width:200,alignItems:'center'}} 
                src={products.image}
                 alt="" /> 
                  <h2>{products.title}</h2>
                  <p>{products.price}</p>
                  <p>{products.category}</p>
                    

              </div>
              
              </>
        ))
        
      }
      <button ></button>
      </div>
      </div>
       
    </>
  )
}

export default App
