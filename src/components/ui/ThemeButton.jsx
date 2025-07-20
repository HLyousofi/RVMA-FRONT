import useDark from '../../hooks/useDark'; 
import { useEffect, useState } from 'react';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';






const ThemeButton = () => {
    const {theme, setTheme} = useDark();
    const [themeIcon, setThemeIcon] = useState('LightThemeIcon');
  

    function handlChange() {
       
        setTheme(theme);
    }

    useEffect(() => {
            
            setThemeIcon(theme == 'dark' ? <LightModeOutlinedIcon />: <NightlightOutlinedIcon />)
    },[theme])

    return (
        <button type="button" onClick={handlChange} className="hs-dark-mode-active:hidden  hs-dark-mode group  text-gray-400 hover:text-blue-600 font-medium dark:text-gray-400 dark:hover:text-gray-500" data-hs-theme-click-value="dark">
            {themeIcon}
        </button>
    )
};

export default  ThemeButton;