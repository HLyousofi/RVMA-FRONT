
import { useMemo, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useDark from '../hooks/useDark';
import AlertComponent from '../components/ui/AlertComponent'
import PopUp from '../components/Popup';

export default function Layout() {

    const {theme} = useDark();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    const darkTheme = useMemo(() =>  createTheme({
            palette: {
            mode: theme == 'dark' ? 'dark' : 'light',
            },
        }),[theme]);
    
    return(
        <ThemeProvider theme={darkTheme}>
            <div className=' min-h-screen overflow-hidden bg-gray-100 dark:bg-gray-600'>
                <PopUp />
                <AlertComponent />
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <Navbar isOpen={isSidebarOpen}no toggleSidebar={toggleSidebar} />
                <main className={` h-full xl:w-10/12 mb-12   xl:mb-0 px-4 ${ isSidebarOpen ? "sm:ml-64 w-full" : "sm:ml-0 min-w-full"}  mt-24`} >
                    <Outlet />
                </main>
            </div>
        </ThemeProvider>
    )
}











