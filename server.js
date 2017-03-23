const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000; // config app with Heroku and local as well

var app = express();
hbs.registerPartials(__dirname + '/views/partials'); 
app.set('view engine', 'hbs');  


// app.use it how ou register a middleware ...and it takes a function 
// we use next to tell express we r done ...
// next exist u could tell ur middleware function is done 
// u could hav as mush as middleware u like , register to single app
// for eg we aleady hav a middleware that serves up the directory

//everything thats comes from client is store in the request (req) ...

//using the middle we trace how our server is working ..

app.use((req,res,next) => {
    var now = new Date().toString();
    
    var log = `${now} ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log',log + '\n');
    next();    
});

/**this is a middle ware .... */
/*
app.use((req,res,next) => {
    res.render('maintenance.hbs');
    //https://github.com/aamirramay296/Express-Node-2-Web-Server
});
*/
//SHA256:E7hxuJo7prvN+PoRIZ3GxOlf9jQIsrZpPP5hD73/pxc aamir.ramay1@gmail.com
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('currentYear', () => {
   return new Date().getFullYear(); 
});
//https://frozen-escarpment-54965.herokuapp.com/

hbs.registerHelper('screamIt', (text) => {
   return text.toUpperCase(); 
});

app.get('/',(req,res) => {
    
    res.render('home.hbs', {
        pageTitle:'Home Page',
        paragraph:'Welcome to my home ...',
      
    });
});

app.get('/about', (req,res) => {
   res.render('about.hbs', {
       pageTitle: 'About Page',
   });
});

app.get('/project', (req,res) => {
    res.render('project.hbs', {
        pageTitle:'Project Page'
    })
})

app.get('/bad', (req,res) => {
   res.send({
       errorMessage: 'Unable To Load Page'
   });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
}); 

