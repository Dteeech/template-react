import { NavLink } from "react-router-dom";
import { useEffect, useContext,useState } from 'react'
import axios from 'axios'
import { StoreContext } from '../tools/context.js'
import logo from '../assets/img/logo_retro_games_blanc.png'

const Nav = (props) => {
  
  const [showLinks, setShowlinks] = useState(false)
  
  const handleShowLinks = () => {
    setShowlinks(!showLinks)
  }
  
  const [state, dispatch] = useContext(StoreContext)

  useEffect(() => {
    if (!axios.defaults.headers.common['Authorization']) {
      const token = localStorage.getItem("jwtToken")
      if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      }
    }
  }, [])

  return (
    <div>
      <nav className ={`nav ${showLinks ? "show-nav" : "hide-nav"}`}>
        <div className="navbar_logo">
          <img src={logo} alt="logo du site"/>
        </div>
        {state.user.role_id === 1 ?
          (<NavLink onClick={handleShowLinks} className="admin_path" to="/admin/AdminPanel">
              ADMIN
            </NavLink>)
          : null
        }
  
            <ul className="navbar_links">
              <li>
                <NavLink onClick={handleShowLinks}to="/cart" className="navbar_link">
                  
                  <i className="fa-solid fa-cart-shopping">Panier</i>
                </NavLink>
              </li>
              <li>
                <NavLink onClick={handleShowLinks} to="/" className="navbar_link">
                  <i className="fa-solid fa-house">Home</i>
                </NavLink>
              </li>
              <li>
                <NavLink onClick={handleShowLinks} to="/ProductsFilter" className="navbar_link">
                  <i className="fa-solid fa-gamepad"></i>
                </NavLink>
              </li>
              <li>
                {state.user.isLogged ?
                  (<NavLink onClick={handleShowLinks} to={`/MyAccount/${state.user.id}`} className="navbar_link">
                    <i className="fa-solid fa-user">Mon compte</i>
                  </NavLink>)
                  :
                    (<NavLink onClick={handleShowLinks} to="/login" className="navbar_link">
                      <i className="fa-solid fa-user">Se connecter</i>
                    </NavLink>)
                }
              </li>
              
              
              
            </ul>
            <button className="navbar_burger" onClick={handleShowLinks}>
              <span className="burger-bar"></span>
            </button>
          
      </nav>
    </div>
  );
};

export default Nav;
