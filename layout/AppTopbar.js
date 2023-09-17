import Link from 'next/link';
import PrimeReact from 'primereact/api';
import {classNames} from 'primereact/utils';
import React, {forwardRef, useContext, useImperativeHandle, useRef} from 'react';
import {LayoutContext} from './context/layoutcontext';
import {Divider} from "primereact/divider";

const AppTopbar = forwardRef((props, ref) => {
    const {layoutConfig, layoutState, onMenuToggle, showProfileSidebar, setLayoutConfig} = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    return (
        <div className="flex justify-content-between layout-topbar">
            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button"
                    onClick={onMenuToggle}>
                <i className="pi pi-bars"/>
            </button>
            <Link href="/" className="topbar-title">
                <span>BUĞRA BOZKIR</span>
            </Link>

            <div ref={topbarmenuRef}
                 className={classNames('layout-topbar-menu', {'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible})}>
                <button className="p-link layout-topbar-button layout-menu-button" type="button" onClick={() => {
                    window.open('https://linkedin.com/in/abbozkir')
                }}>
                    <i className="pi pi-linkedin"></i>
                    <span>LinkedIn</span>
                </button>
                <button className="p-link layout-topbar-button layout-menu-button" type="button" onClick={() => {
                    window.open('https://github.com/abbozkir')
                }}>
                    <i className="pi pi-github"></i>
                    <span>Github</span>
                </button>
                <button className="p-link layout-topbar-button layout-menu-button" type="button" onClick={() => {
                    window.open('mailto:abbozkir@gmail.com')
                }}>
                    <i className="pi pi-at"></i>
                    <span>E-Mail</span>
                </button>
                <Divider layout={layoutState.profileSidebarVisible ? 'horizontal' : 'vertical'}/>


                <button className="p-link layout-topbar-button layout-menu-button" type="button" onClick={() => {
                    if (layoutConfig.colorScheme === "dark") {
                        PrimeReact.changeTheme(layoutConfig.theme, 'bootstrap4-light-blue', 'theme-css', () => {
                            setLayoutConfig((prevState) => ({
                                ...prevState,
                                'theme': 'bootstrap4-light-blue',
                                'colorScheme': 'light'
                            }));
                        });
                    } else {
                        PrimeReact.changeTheme(layoutConfig.theme, 'bootstrap4-dark-blue', 'theme-css', () => {
                            setLayoutConfig((prevState) => ({
                                ...prevState,
                                'theme': 'bootstrap4-dark-blue',
                                'colorScheme': 'dark'
                            }));
                        });
                    }
                }}>
                    {layoutConfig.colorScheme === "dark" ?
                        <i className="pi pi-sun"></i> :
                        <i className="pi pi-moon"></i>
                    }
                    <span>{layoutConfig.colorScheme === "dark" ? 'Light' : 'Dark'} Mode</span>
                </button>
            </div>
            <button ref={topbarmenubuttonRef} type="button"
                    className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v"/>
            </button>
        </div>
    );
});

export default AppTopbar;
