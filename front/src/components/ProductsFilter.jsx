import { Fragment, useState, useEffect } from "react";
import { BASE_URL, BASE_IMG } from "../tools/constante.js"
import axios from "axios";

const ProductsFilter = () => {
  const [products, setProducts] = useState([]);
  const [type, setType] = useState("consoles"); // "consoles" ou "jeux"

  useEffect(() => {
    axios.get(`${BASE_URL}/admin/allProducts`).then((response) => {
        console.log(response.data.result)
      setProducts(response.data.result);
    });
  }, []);

  // fonction pour filtrer les produits selon le type sélectionné
  const filterProducts = () => {
    if (type === "consoles") {
      return products.filter((product) => product.type_id === 1);
    } else if (type === "jeux") {
      return products.filter((product) => product.type_id === 2);
    } else {
      return products; // retourne tous les produits si le type est indéfini
    }
  };

  // fonction pour changer le type sélectionné
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  return (
    <div>
      <h1>Produits</h1>
      <div>
        <label htmlFor="type">Sélectionner Jeux ou consoles :</label>
        <select id="type" value={type} onChange={handleTypeChange}>
          <option value="consoles">Consoles</option>
          <option value="jeux">Jeux</option>
        </select>
      </div>
      <ul>
        {filterProducts().map((product) => {
          return(
            <Fragment>
              <img src={`${BASE_IMG}/${product.url}`}/>
              <li key={product.id}>{product.name}</li>
            </Fragment>
          )
        }
        )}
      </ul>
    </div>
  );
};

export default ProductsFilter;
