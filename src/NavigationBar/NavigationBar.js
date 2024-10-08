import { useContext } from 'react';
import React from 'react';
import './NavigationBar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import FeedSection from '../FeedSection/FeedSection';
import OptionSection from '../OptionSection/OptionSection';
import { ThemeContext } from '../ThemeContext/ThemeContext';

const NavigationBar = () => {

    // Use the theme and toggleTheme from the ThemeContext
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <nav className="navbar">
            
            <div className="navbar-left">
                <i className="bi bi-facebook logo-icon"></i>
                <button className="toggle-theme-btn" onClick={toggleTheme}>
                    {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                </button>
                <form className="search-form">
                    <input className="form-control search-input" type="search" placeholder="Search Facebook" aria-label="Search" />
                </form>
            </div>

            <div className="navbar-center">
                <FeedSection />
            </div>

            <div className="navbar-right">
                <OptionSection />
            </div>

        </nav>
    );
};

export default NavigationBar;
