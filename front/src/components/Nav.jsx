import { NavLink } from "react-router-dom";
import { useEffect, useContext } from 'react'
import axios from 'axios'
import { StoreContext } from '../tools/context.js'
import AdminSideBar from './admin/AdminSideBar.jsx'

const Nav = (props) => {
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
      <nav className ="nav">
        <ul>
          <li>
            <NavLink to="/cart">
              
              <i className="fa-solid fa-cart-shopping"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <i class="fa-light fa-house-blank"></i>
            </NavLink>
          </li>
          <li>
          {state.user.isLogged ?
            (<NavLink to={`/MyAccount/${state.user.id}`}>
              <i className="fa-solid fa-user"></i>
            </NavLink>)
            :
              (<NavLink to="/login">
                <i className="fa-solid fa-user"></i>
              </NavLink>)
          }
          </li>
        </ul>
      </nav>
      {state.user.role_id === 1 &&
            <AdminSideBar />
          }
    </div>
  );
};

export default Nav;
