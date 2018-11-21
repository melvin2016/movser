import React from 'react';
import SearchItem from './SearchItem';
export default (props)=>(
    <>
        {props.lists.map((list)=>
            <SearchItem key={list.poster_path||list.profile_path} imgUrl={list.poster_path||list.profile_path} name={list.name||list.title}/>
        )}
    </>

)