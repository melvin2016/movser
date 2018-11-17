const express = require('express');

const nextApp = require('../lib/nextInit');
const handler = nextApp.getRequestHandler();

/**Initialising Express Router */
 const Router = express.Router();

 /**INDEX PAGE ROUTE */
 Router
    .route(['/','/index'])
    .get((req,res)=>{
        nextApp.render(req,res,'/index');
    });
/**SEARCH PAGE ROUTE */
Router
    .route('/search/:name')
    .get((req,res)=>{
        nextApp.render(req,res,'/search',{name:req.params.name},`/search/${req.params.name}`)
    });
/**non defined routes will be redirected to nextjs's error page */
Router.get('*',(req,res)=>{
    handler(req,res);
});

module.exports = {
    Router:Router,
    nextApp:nextApp
};