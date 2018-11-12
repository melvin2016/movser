require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');

//CUSTOM MODULES
const nextApp = require('./NextRoutes/next.routes').nextApp;
const nextRoutes = require('./NextRoutes/next.routes');

/**PORT 3000 Default  */
const PORT = process.env.PORT || 3000; 

nextApp.prepare().then(()=>{
    /**Using Morgan Logger for http requests */
    app.use(morgan('tiny'));

    /**using next routes module */
    app.use(nextRoutes.Router);
    console.log(process.env.TMDB_KEY);
    /**listening on assigned PORT */
    app.listen(PORT,()=>{
        console.log(`Server listening on PORT : ${PORT}`)
    })
})
.catch((err)=>{
    console.log(err);
})