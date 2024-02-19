import useDark from "../hooks/useDark";
import ThemeButton from "./ui/ThemeButton";
import useAlert from "../hooks/useAlert";
import { Alert } from "@mui/material";






const Navbar = () => {

    // const {dark, setDark} = useDark();
   
    return (
        

                <nav className="bg-white sm:ml-64 ml-0 border-l-2 border-gray-100  dark:border-gray-600 dark:bg-gray-800">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">RVMA</span>
                    </a>
                    <ThemeButton />
                </div>
                </nav>

    )
}

export default Navbar;

