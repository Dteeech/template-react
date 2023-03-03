import { Fragment, useState, useEffect, useContext } from "react";
import { BASE_URL, BASE_IMG } from "../tools/constante.js"
import { StoreContext } from "../tools/context.js"
import Nav from "./Nav"
import useCart from "./Hooks/useCart.jsx"
import axios from "axios";

const ProductsFilter = () => {
  const { addToCart } = useCart()
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [type, setType] = useState("consoles"); // "consoles" ou "jeux"
  const [state, dispatch] = useContext(StoreContext)
  const user_id = state.user.id

  useEffect(() => {
    axios.get(`${BASE_URL}/admin/allProducts`).then((response) => {
        console.log(response.data.result);
        dispatch({ type: "ALL_PRODUCTS", payload: response.data.result })
      })
      .catch(err => { console.log(err) })
      .then(res => {
        if (state.products.length > 0) {
          filterProducts()
        }
      })
  }, []);

  // fonction pour filtrer les produits selon le type sélectionné
  //useEffect
  //à sauvegarder dans un state
  const filterProducts = () => {
    console.log(state.products)
    if (type === "consoles") {
      setDisplayedProducts(state.products.filter((product) => product.type_id !== 1));
    }
    else if (type === "jeux") {
      setDisplayedProducts(state.products.filter((product) => product.type_id !== 2));
    }
  };

  // fonction pour changer le type sélectionné
  const handleTypeChange = (event) => {
    setType(event.target.value);
    filterProducts()
  };

  const handleAddToCart = async (product, quantity) => {
    console.log({product, quantity,user_id })
    
    await addToCart(product, quantity, user_id)
    
  }
  
  return (
    <div>
    <Nav />
      <h1>Produits</h1>
      <div>
        <label htmlFor="type">Sélectionner Jeux ou consoles :</label>
        <select id="type" value={type} onChange={handleTypeChange}>
          <option value="consoles">Consoles</option>
          <option value="jeux">Jeux</option>
        </select>
      </div>
      <ul>
        {displayedProducts.map((product,i) => {
          return(
            <Fragment key={`${product.id}-${type}`}>
              <img src={`${BASE_IMG}/${product.url}`}/>
              <li>{product.name}</li>
              <li><strong>{product.price}€</strong></li>
              <button onClick={()=> handleAddToCart(product,1)}>Ajouter au panier</button>
            </Fragment>
          )
        }
        )}
      </ul>
    </div>
  );
};

export default ProductsFilter;
