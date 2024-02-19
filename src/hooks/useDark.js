import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeProvider";




const useDark = () => {

    return useContext(ThemeContext);
    
};

export default useDark;






