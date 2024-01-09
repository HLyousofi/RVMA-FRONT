import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeProvider";




const useDark = () => {

    return useContext(ThemeContext);
    
    // const [theme, setTheme] = useState(localStorage?.theme);
    // const colorTheme = theme === 'dark' ? 'light' : 'dark';
    // useEffect(() => {

    //     const root = window.document.documentElement;
    //     root.classList.remove(colorTheme);
    //     root.classList.add(theme);
    
    //     // save theme to local storage
    //     localStorage.setItem('theme', theme);
    //   }, [theme, colorTheme]);
    //   return [colorTheme, setTheme];
};

export default useDark;






