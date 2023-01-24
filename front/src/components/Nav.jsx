// Importation des composants NavLink de react-router-dom
import { NavLink } from "react-router-dom";

// Création d'un composant de navigation
const Nav = (props) => {
  // Retourne un élément de navigation contenant une liste d'éléments de navigation
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact">
            contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/profil">
            profil
          </NavLink>
        </li>
        <li>
          <NavLink to="/product/react">
            React
          </NavLink>
        </li>
        <li>
          <NavLink to="/product/html">
            HTML
          </NavLink>
        </li>
        <li>
          <NavLink to="/testme">
            Test
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

// Exportation du composant de navigation
export default Nav;