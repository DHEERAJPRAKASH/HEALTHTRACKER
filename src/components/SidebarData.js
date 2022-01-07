import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
    { 
        title:'Home',
        path:'/home',
        icon:<AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    { 
        title:'Doctors',
        path:'/doctors',
        icon:<FaIcons.FaUserCheck />,
        cName: 'nav-text'
    },
    { 
        title:'User',
        path:'/user',
        icon:<FaIcons.FaUserAlt />,
        cName: 'nav-text'
    },
    { 
        title:'Login',
        path:'/login',
        icon:<IoIcons.IoMdPeople />,
        cName: 'nav-text'
    },
    { 
        title:'Signup',
        path:'/signup',
        icon:<IoIcons.IoMdPeople />,
        cName: 'nav-text'
    },
]