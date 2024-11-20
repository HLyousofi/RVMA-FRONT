import { NavLink } from "react-router-dom";




const CardComponenet = ({element}) =>
    {
        
        return(
        <li className="flex flex-col justify-center items-center w-full bg-white text-gray-900 dark:text-white dark:bg-gray-800 lg:w-[32%] px-10 pt-16 rounded-lg self-stretch hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.4)] transition-all duration-150 ease-in">
            <NavLink to={element.link} className="flex flex-col items-center text-center">                
                {/* Material-UI Icon */}
                {element.iconecard } 
                
                {/* Subtitle */}
                <span className="mt-2  text-gray-700 dark:text-white font-bold text-lg">{element.subtitle} </span>
            </NavLink>
        </li>

    )};

    export default CardComponenet;