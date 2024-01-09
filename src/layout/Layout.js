
import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useDark from '../hooks/useDark';
import useAlert from '../hooks/useAlert';
import AlertComponent from '../components/ui/AlertComponent'
import { Alert } from '@mui/material';
import {Snackbar} from '@mui/material';

export default function Layout() {

    const {theme} = useDark();

   

    


    const darkTheme = useMemo(() =>  createTheme({
            palette: {
            mode: theme == 'dark' ? 'dark' : 'light',
            },
        }),[theme]);
    
    return(
        <ThemeProvider theme={darkTheme}>
            <div className='min-h-screen overflow-hidden bg-gray-100 dark:bg-gray-600'>
                <AlertComponent />
                <Sidebar />
                <Navbar />
                <main className="w-full h-full xl:w-10/12 mb-12  xl:auto xl:mb-0 px-4 sm:ml-64 ml-0 mt-24" >
                    
                    <Outlet />
                </main>
            </div>
        </ThemeProvider>
    )
}






