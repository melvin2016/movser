import React from 'react';
import NavResponsive from './NavBar/NavResponsive';

export default (props)=>(
    <>
        <NavResponsive page={props.page} lists={[{name:'SEARCH',href:'/search',icon:'search'},{name:'LOCATION',href:'/location',icon:'location_on'}]}/>
        {props.children}
    </>
);