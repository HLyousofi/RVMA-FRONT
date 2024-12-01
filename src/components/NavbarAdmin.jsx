import NavElement from "./ui/NavElement";
import NavbarAdminData from "./data/NavbarAdminData";


const NavbarAdmin = () => {

    return (
        <div className="relative flex   shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.21)] min-w-0 break-words  dark:bg-gray-800 w-full mb-6  rounded-xl ">
                <div className="w-full px-2 py-1 overflow-x-auto bg-gray-70 dark:bg-gray-800  rounded-xl">
                    <ul className="grid grid-flow-col justify-stretch font-medium space-x-2 w-full">
                        {NavbarAdminData.map((element, index)=> {
                            return(
                                    <NavElement element={element}  key={index} />
                            )
                        })}
                    </ul>
            </div>
        </div>
           
        )};

export default NavbarAdmin;
