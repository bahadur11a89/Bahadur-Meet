import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    // A simple layout for pages without the main dashboard chrome (e.g., login, 404)
    return (
        <Outlet />
    );
};

export default MainLayout;