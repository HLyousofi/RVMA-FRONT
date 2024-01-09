import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";





const NavElement = ({element}) => {

    return (
        <li >
            <NavLink to={element.link} active className={({isActive}) => isActive ? "flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:bg-gray-700   group bg-indigo-300" : "flex items-center p-2 text-gray-800 rounded-lg dark:text-white hover:bg-indigo-100 dark:hover:bg-gray-700 group "}>    
               {element.icon} 
                <span className="ms-3" >{element.title}</span>
            </NavLink>
        </li>

        
    )
};

export default NavElement;