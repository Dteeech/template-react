import { NavLink } from "react-router-dom";
import {useEffect, useContext} from 'react'
import ListUsers from "./ListUsers.jsx"
import AddProduct from "./AddProduct.jsx"
import ListProducts from "./ListProducts.jsx"
import axios from 'axios'
/*
import { StoreContext} from '../../tools/context.js'*/

const AdminSideBar = (props) => {
/*const [state, dispatch] = useContext(StoreContext)*/
  const { onNavigation } = props 
  
  useEffect(() => {
    if(!axios.defaults.headers.common['Authorization']){
      const token = localStorage.getItem("jwtToken")
      if(token){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+token
      }
    }
  },[])
  
  const handleListUsers = () => {
    onNavigation(<ListUsers />)
  }
  
  const handleAddProduct =()=> {
    onNavigation(<AddProduct />)
  }
  
  const handleListProducts =()=> {
    onNavigation(<ListProducts />)
  }
  
  return (
    <nav className="admin_side_bar">
      <ul>
        <li>
        <button onClick={handleListUsers}>
          Liste des utilisateurs
        </button>
        </li>
        <li>
        <button onClick={handleAddProduct}>
          Ajouter un produit
        </button>
        </li>
        <li>
        <button onClick={handleListProducts}>
          Liste des produits
        </button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminSideBar;