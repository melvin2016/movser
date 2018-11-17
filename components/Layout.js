import React from 'react';
import NavResponsive from './NavBar/NavResponsive';

export default (props)=>(
    <>
        <NavResponsive lists={[{name:'SEARCH',href:'/search'},{name:'LOCATION',href:'location'}]}/>
        {props.children}
    </>
);