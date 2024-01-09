import { createContext, useEffect, useState } from "react";



export const ThemeContext =createContext({
    theme : null,
    setTheme : () => {}
});

export const ThemeProvider = ({ children }) => {
    const [theme, _setTheme] = useState();
    const root = window.document.documentElement;
    
    const setTheme = (oldTheme) => {
        const newTheme = oldTheme === 'dark' ? 'light' : 'dark';
        _setTheme(newTheme);
        
        root.classList.remove(oldTheme);
        root.classList.add(newTheme);
        // save theme to local storage
        localStorage.setItem('theme', newTheme);
    }

    // useEffect to get the initial theme from local storage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            _setTheme(savedTheme);
            root.classList.add(savedTheme);
        } else {
            // If no theme is found in local storage, set the default theme
            _setTheme('light');
            root.classList.add('light');
            
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }} >
            {children}
        </ThemeContext.Provider>
    );
}






// export const ThemeProvider = ({ children }) => {
//     const [theme, _setTheme] = useState();
//     const colorTheme = theme === 'dark' ? 'light' : 'dark';
//     const setTheme = (newTheme) => {
//         _setTheme(newTheme);
//         const root = window.document.documentElement;
//         root.classList.remove(colorTheme);
//         root.classList.add(theme);
    
//         // save theme to local storage
//         localStorage.setItem('theme', theme);
//       }
    

  



   

//     return (
//         <ThemeContext.Provider value={{ theme, setTheme}} >
//             {children}
//         </ThemeContext.Provider>

//     )}



