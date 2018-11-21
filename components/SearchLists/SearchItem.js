import React from 'react';
export default (props)=>(
    <div className="card hoverable" style={{cursor:'pointer'}}>
        <div className="card-image">
            <img src={props.imgUrl===null?'/static/noImage.png':`https://image.tmdb.org/t/p/w342/${props.imgUrl}`}/>
            <span className="card-title truncate" style={{fontSize: '20px',fontWeight: '500',color:'#95fff5'}}>{props.name}</span>
        </div>
    </div>
    
);