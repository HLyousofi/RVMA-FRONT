import { useContext } from "react";
import { PopupContext } from "../contexts/PopupProvider";


const usePopup = () => {

    return useContext(PopupContext);
    
};

export default usePopup;






