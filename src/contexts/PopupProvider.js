import { createContext, useState } from "react";




export const PopupContext =createContext();


export const PopupProvider = ({ children }) => {
    const [isOpen , setIsOpen] = useState(false);
    const [yesAction, setYesAction] = useState(() => () => {});
    const [noAction, setNoAction] = useState(() => () =>  {});
    const [message, setMessage] = useState('Êtes-vous sûr de bien vouloir supprimer cet élément?');


    const openPopup = () => {
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
    }





    return (
        <PopupContext.Provider value={{ isOpen, message, setMessage, openPopup, closePopup, yesAction,noAction , setYesAction, setNoAction}} >
            {children}
        </PopupContext.Provider>

    )}



