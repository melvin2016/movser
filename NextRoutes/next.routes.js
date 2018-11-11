const express = require('express');

const nextApp = require('../lib/nextInit');
const handler = nextApp.getRequestHandler();

/**Initialising Express Router */
 const Router = express.Router();

 /**INDEX PAGE */
 Router
    .route(['/','/index'])
    .get((req,res)=>{
        nextApp.render(req,res,'/index');
    });


/**non defined routes will be redirected to nextjs's error page */
Router.get('*',(req,res)=>{
    handler(req,res);
});

module.exports = {
    Router:Router,
    nextApp:nextApp
};