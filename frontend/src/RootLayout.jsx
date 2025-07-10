import { Outlet } from '@tanstack/react-router';
import Navbar from './components/NavBar.jsx'

function RootLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

export default RootLayout;
