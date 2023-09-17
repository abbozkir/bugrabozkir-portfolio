import React from 'react';
import AppMenuitem from './AppMenuitem';
import {MenuProvider} from './context/menucontext';

const AppMenu = () => {
    const model = [
        {
            items: [
                {label: 'Resume', icon: 'pi pi-fw pi-home', to: '/'}
            ]
        },
        {
            label: 'Showcase',
            items: [
                {label: 'Signal Chart', icon: 'pi-fw fa-solid fa-satellite-dish', to: '/showcase/signal-chart'},
                {label: 'Weather Chart', icon: 'pi-fw fa-solid fa-cloud-sun', to: '/showcase/weather-chart'},
                {label: 'Development Planning', icon: 'pi-fw fa-brands fa-jira', to: '/showcase/development-planning'},
                {label: 'Game Planning', icon: 'pi-fw fa-solid fa-puzzle-piece', to: '/showcase/game-planning'}
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => (
                    <AppMenuitem item={item} root={true} index={i} key={item.label}/>
                ))}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
