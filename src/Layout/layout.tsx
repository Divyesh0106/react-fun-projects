import React, { useState } from "react";
import { Link, Outlet } from 'react-router-dom';
import styles from './layout.module.css';

const Layout: React.FC<{}> = () => {
    const [openSidebar, setOpenSidebar] = useState(false);    
    return (
        <div className={styles.appWrapper}>
            <div className={`${styles.collapsableSidebar} ${openSidebar ? styles.sidebarWidth : ''}`}>
                <button className={styles.sidebarCloseBtn} onClick={(e)=>{ setOpenSidebar(!openSidebar) }}>&#x2715;</button>
                <ul>
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/tic-tac-toe'}>TicTacToe</Link></li>
                    <li><Link to={'/clock-25'}>25 + 5 Clock</Link></li>
                    <li><Link to={'/calculator'}>Calculator</Link></li>
                    <li><Link to={'/drum-machine'}>Drum Machine</Link></li>
                    <li><Link to={'/markdown-previewer'}>Markdown Previewer</Link></li>
                </ul>
            </div>
            <div className={`${styles.mainBody} ${openSidebar ? styles.mainBodyMarginLeft : ''} `}>
                <button className={styles.openHamburger} onClick={(e)=>{ setOpenSidebar(!openSidebar) }}>&#9776;</button>
                <Outlet/>
            </div>
        </div>
    )
}


export default Layout;