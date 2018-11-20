import React from 'react';
export default (props)=>(
    <div class="card hoverable" style={{cursor:'pointer'}}>
        <div class="card-image">
            <img src={`https://image.tmdb.org/t/p/w342/${props.imgUrl}`}/>
            <span class="card-title truncate" style={{fontSize: '20px',fontWeight: '500',color:'#95fff5'}}>{props.name}</span>
        </div>
    </div>
    
);