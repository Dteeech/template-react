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
      <nav class ="nav">
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
          {state.isLogged ?
            (<NavLink to={`/MyAccount/${state.user.id}`}>
              <i class="fa-solid fa-user"></i>
            </NavLink>)
            :
              (<NavLink to="/login">
                <i class="fa-solid fa-user"></i>
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
