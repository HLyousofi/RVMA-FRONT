import { NavLink } from "react-router-dom";
import useLogout from "../../hooks/useLogout"; // Importer le hook de déconnexion

const NavElement = ({ element }) => {
  const handleLogout = useLogout(); // Récupérer la fonction de déconnexion

  // Si l'élément est "logout", ne pas utiliser NavLink, mais un bouton
  if (element.link === "logout") {
    return (
      <li>
        <button
          onClick={handleLogout} // Déclencher le popup au lieu de naviguer
          className="flex items-center p-2 text-gray-800 rounded-lg dark:text-white hover:bg-indigo-100 dark:hover:bg-gray-700 group w-full text-left"
        >
          {element.icon}
          <span className="ms-3">{element.title}</span>
        </button>
      </li>
    );
  }

  // Pour les autres éléments, utiliser NavLink comme avant
  return (
    <li>
      <NavLink
        to={element.link}
        className={({ isActive }) =>
          isActive
            ? "flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:bg-gray-700 group bg-indigo-300"
            : "flex items-center p-2 text-gray-800 rounded-lg dark:text-white hover:bg-indigo-100 dark:hover:bg-gray-700 group"
        }
      >
        {element.icon}
        <span className="ms-3">{element.title}</span>
      </NavLink>
    </li>
  );
};

export default NavElement;