"use client"

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface ColorContextTypes {
    pageColor: '#C0D84D' | '#91D7eE' | '#FF99CC';  
}

const ColorContext = createContext<ColorContextTypes>(
    {
        pageColor: '#C0D84D'
    }
);

export const useColor = () => useContext(ColorContext);

export const ColorProvider = ({ children }: { children: ReactNode }) => {
    const [pageColor, setPageColor] = useState<'#C0D84D' | '#91D7eE' | '#FF99CC'>('#C0D84D');

    useEffect(() => {
        const page = window.location.pathname;
        
        if(page.includes('/plants')) {
            setPageColor('#C0D84D');
        } else if(page.includes('/seeds')) {
            setPageColor('#91D7eE');
        } else if(page.includes('/merch')) {
            setPageColor('#FF99CC');
        }
    }, []);
    
    return (
        <ColorContext.Provider value={{ pageColor }}>
            {children}
        </ColorContext.Provider>
    );
};