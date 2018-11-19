import React from 'react';
import SearchItem from './SearchItem';
export default (props)=>(
    <>
        {props.lists.map((list)=>
            <SearchItem imgUrl={list.poster_path} content={list.overview} name={list.name||list.title}/>
        )}
    </>

)