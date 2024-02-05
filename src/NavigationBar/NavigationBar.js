// NavigationBar.js

import React from 'react';
import './NavigationBar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import FeedSection from '../FeedSection/FeedSection';
import OptionSection from '../OptionSection/OptionSection';

const NavigationBar = () => {
    return (
        <nav className="navbar navbar-expand-lg bar">
            <div className="container-fluid ">

                <div className="d-flex align-items-center bar">
                    <i class="bi bi-facebook logo-icon"></i>
                    <form className="d-flex ms-2">
                        <input className="form-control me-2 rounded-pill bg-light" type="search" placeholder="Search Facebook " aria-label="Search"></input>
                    </form>
                </div>


                <FeedSection />

                <OptionSection />

            </div>
        </nav>
    );
};

export default NavigationBar;
