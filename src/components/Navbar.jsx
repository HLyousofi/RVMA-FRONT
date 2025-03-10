import ThemeButton from "./ui/ThemeButton";
import logo3 from "../assets/images/logo3.png";
import SidebarButton from "./ui/SidebarButton";






const Navbar = ({toggleSidebar, isOpen}) => {

   
    return (
        <nav className={`fixed z-50 bg-white border-gray-100  dark:border-gray-600 dark:bg-gray-800
             ${isOpen ? "md:ml-64 md:w-[calc(100%-16rem)] w-full" : "ml-0 w-full"}
                      `}>
            <div className="flex   justify-between mx-2 p-4">
                <SidebarButton isOpen={isOpen} toggleSidebar={toggleSidebar} />
                <a  className=" space-x-3 rtl:space-x-reverse">
                    <img src={logo3} className="h-12" alt="RVMA Logo" />
                </a>
                <ThemeButton  />
            </div>
        </nav>

    )
}

export default Navbar;

