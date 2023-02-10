import { NavLink } from "react-router-dom";
import {useEffect} from 'react'
import axios from 'axios'
const Nav = (props) => {
  
  useEffect(() => {
    if(!axios.defaults.headers.common['Authorization']){
      const token = localStorage.getItem("jwtToken")
      if(token){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+token
      }
    }
  },[])
  
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink to="/consoles">
            Consoles
          </NavLink>
        </li>
        <li>
          <NavLink to="/jeux">
            Jeux
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">
            icone loggin
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;