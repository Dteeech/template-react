import axios from "axios"
import { BASE_URL, BASE_IMG } from '../../tools/constante.js'
import { useEffect, useState } from "react"
import { NavLink } from 'react-router-dom'

const ListProducts = () => {
    const [productsList, setProductsList] = useState([])

    useEffect(() => {
        if (productsList.length === 0) {
            axios.get(`${BASE_URL}/admin/allProducts`)
                .then(res => setProductsList(res.data.result))
                .catch(err => console.log(err))
        }
    }, [])

    const deleteProduct = (id, url) => {
        
    axios.post(`${BASE_URL}/admin/deleteProduct`, { id, url })
    
        .then(() => {
            
            setProductsList(productsList.filter(product => product.id !== id))
        })
        .catch(err => {
            console.log(err)
        })
}

    
    return(
        <div>
        
            
            
            {productsList.map((product,i) => {
            return(
            
            <div key={i}>
            
                <ul>
                    <li>Name: {product.name} </li>
                    <li>Type ID: {product.type_id}</li>
                    <li>Price: {product.price}</li>
                    <li>Stock: {product.stock}</li>
                    <li>Categorie ID: {product.category_id}</li>
                </ul>
                <img src={`${BASE_IMG}/${product.url}`} alt="Product image" />
                <button onClick={() => deleteProduct(product.id, product.url)}>X</button>
                    <NavLink to={`/admin/products/edit/${product.id}`}><button>Modifier</button>
                    </NavLink>
            </div>
            )
        })}
        </div>
    )
}
 
export default ListProducts