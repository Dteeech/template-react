import { Fragment, useState, useEffect, useContext } from "react";
import { BASE_URL, BASE_IMG } from "../tools/constante.js"
import { StoreContext } from "../tools/context.js"
import useCart from "./Hooks/useCart.jsx"
import axios from "axios";

const ProductsFilter = () => {
  
  const { addToCart } = useCart()
  const [displayedProducts, setDisplayedProducts] = useState({consoles:null,
    jeux: null
  });
  
  const [type, setType] = useState(undefined); // "consoles" ou "jeux"
  
  const [state, dispatch] = useContext(StoreContext)
  
  const user_id = state.user.id
  

  
  useEffect(() => {
    axios.get(`${BASE_URL}/admin/allProducts`)
    .then((response) => {
        dispatch({ type: "ALL_PRODUCTS", payload: response.data.result })
        const data = {...displayedProducts}
        data.consoles = response.data.result.filter((product) => product.type_id === 1)
        data.jeux = response.data.result.filter((product) => product.type_id === 2)
        setDisplayedProducts(data)  //consoles
      })
      .catch(err => { console.log(err) })
  }, []);
  

  // fonction pour changer le type sélectionné
  const handleTypeChange = (event) => {
    setType(event.target.value);
    
  };

  const handleAddToCart = async(product) => {

    await addToCart(product, user_id)

  }

  return (
    <div className="shopBackground">
      <h1>Produits</h1>
      <div>
        <label className="shopBackgroundLabel" htmlFor="type">Sélectionner jeux ou consoles :</label>
        <select id="type" value={type} onChange={handleTypeChange}>
        {!type && <option value={undefined}>Choisir une catégorie</option>}
        //si option est sélectionné plus possible de sélectionner "choisir une catégorie"

          <option value="consoles">Consoles</option>
          <option value="jeux">Jeux</option>
        </select>
      </div>
      <ul>
        {type && displayedProducts[type].map((product,i) => { //valeur de type a undefined et affichage quand le select est effectif
          return(
            <div className="productCard" key={`${product.id}-${type}`}>
              <img className="productImage" src={`${BASE_IMG}/${product.url}`} alt="photo de l'article"/>
              <div className="productCaption">
                <li>{product.name}</li>
                <li>Prix : <strong>{product.price}€</strong></li>
                
              </div>  
              <button onClick={()=> handleAddToCart(product,1)}>Ajouter au panier</button>
            </div>
            
          )
        }
        )}
      </ul>
    </div>
  );
};

export default ProductsFilter;
