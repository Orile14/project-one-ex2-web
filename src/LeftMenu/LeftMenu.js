import React from "react";
import MakeLeftList from "./MakeLeftList";
import './LeftMenu.css';

const LeftMenu = () => {
    return (
        <div className="left-menu-container">
            <ul className="list-group">
                <MakeLeftList />
            </ul>
        </div>
    );
};

export default LeftMenu;