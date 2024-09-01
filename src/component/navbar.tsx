import React from 'react';
import './navbar.css';
interface NavbarProps {
    // Add any props you need here
}

const Navbar: React.FC<NavbarProps> = () => {
    const [sidebarActive, setSidebarActive] = React.useState(false);

    const toggleMenu = () => {
        setSidebarActive(!sidebarActive);
    };

    return (
        <div>
            <span className="menu-icon" onClick={toggleMenu}>&#9776;</span>
            <div className="overlay" onClick={toggleMenu}></div>
            <nav className={`sidenav ${sidebarActive ? 'active' : ''}`}>
                <div className="left">
                    <a className="active" href="#home">
                        <img src="./../img/logo.png" alt="PixelServer Logo" />
                    </a>
                </div>
                <div className="right">
                    <a href="#news">Game</a>
                    <a href="#contact">VPS</a>
                    <a href="#about">Espace Client</a>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;