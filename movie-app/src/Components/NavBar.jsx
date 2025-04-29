import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import '../css/NavBar.css';

function NavBar() {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-content">
                <div className="navbar-brand">
                    <Link to="/" className="logo">
                        <span className="logo-text">CineVerse</span>
                        <span className="logo-dot">.</span>
                    </Link>
                </div>
                <div className="nav-links">
                    <Link 
                        to="/" 
                        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                    >
                        <span className="link-text">Home</span>
                        <span className="link-underline"></span>
                    </Link>
                    <Link 
                        to="/favorites" 
                        className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
                    >
                        <span className="link-text">Favorites</span>
                        <span className="link-underline"></span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;