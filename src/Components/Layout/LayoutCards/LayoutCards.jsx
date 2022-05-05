import React, { useEffect, useState } from "react";
import { UICards } from "../../UI/UICards/UICards";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const LayoutCards = () => {
  const URL = "https://backend-fullmarket-py.herokuapp.com/getallproducts";

  const [products, setProducts] = useState([]);
  const [ serachProducts , setSerachProducts ] = useState([])
  const [ search , setSearch] = useState("")

  const mostrar = async () => {
    await fetch(URL)
      .then((res) => res.json())
      .then((data) =>{
         setProducts(data)
         setSerachProducts(data)
      });
  };
  useEffect(() => {
    mostrar();
  }, []);
  console.log(products);

  const handleOnchange=(e)=>{
      console.log(e.target.value);
      setSearch(e.target.value)
      filterP(e.target.value)
  }

   const filterP = (toserachs)=>{
     var resultsFilter= serachProducts.filter((elemento)=>{
       if(elemento.name.toString().toLowerCase().includes(toserachs.toLowerCase()) 
       ||elemento.type.toString().toLowerCase().includes(toserachs.toLowerCase()) 
       ){
         return elemento
       }
     });
     setProducts(resultsFilter)
   }

  return (
    <div>
      <div className="search ">
        <input value={search} type='text' onChange={handleOnchange}></input>
        <button className="btn">
          <FontAwesomeIcon icon={faSearch}/>
        </button>
      </div>
    <main className="main-products">
      {products.map((element) => (
        <UICards
          key={element.name + 1}
          typeProduct={element.type}
          imgProduct={element.imgProductURL}
          nameProduct={element.name}
          conditionProduct={element.condition}
          availabilityProduct={element.availability}
          dateProduct={element.date}
          descriptionProduct={element.description}
          cityProduct={element.city}
        />
      ))}
    </main>
    </div>
  );
};
