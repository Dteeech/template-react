import { NavLink } from "react-router-dom";
import {useEffect, useContext} from 'react'
import axios from 'axios'
/*
import { StoreContext} from '../../tools/context.js'*/

const AdminSideBar = (props) => {
/*const [state, dispatch] = useContext(StoreContext)*/
  
  useEffect(() => {
    if(!axios.defaults.headers.common['Authorization']){
      const token = localStorage.getItem("jwtToken")
      if(token){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+token
      }
    }
  },[])
  
  return (
    <nav className ="nav_admin">
      <ul>
        <li>
          <NavLink to="/admin/listUsers">
            Users list
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AdminSideBar;