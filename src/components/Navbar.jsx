import ThemeButton from "./ui/ThemeButton";
import logo3 from "../assets/images/logo3.png"






const Navbar = () => {

   
    return (
        

                <nav className="bg-white sm:ml-64 ml-0 border-l-2 border-gray-100  dark:border-gray-600 dark:bg-gray-800">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a  className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo3} className="h-12" alt="RVMA Logo" />
                    </a>
                    <ThemeButton />
                </div>
                </nav>

    )
}

export default Navbar;

