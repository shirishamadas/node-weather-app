const path = require('path');
const express = require('express');
const hbs = require('hbs');
// const { dirname } = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000
// defining paths for express config

const viewsPath = path.join(__dirname, '../templates/views' );  
app.use(express.static(path.join(__dirname, '../public'))); // setup static directory to server(it expects express function)
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);   // to change the name of folder other than views
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {                 // dynamic data to using handlebars(hbs)
        title: 'Home page!',
        name: 'Use this app to know the latitude and longitude of the place!',
        endofpage: 'Hope you are enjoying the climate :)'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {                 // dynamic data to using handlebars(hbs)  // index is views name without extension(hbs)
        title: 'About us!',
        text: 'This website is created by Shirisha Madas to know the weather conditions, latitude and longitude of the place.',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {                 // dynamic data to using handlebars(hbs)  // index is views name without extension(hbs)
        title: 'Need Help?',
        message: 'Go to Home page then search for a place, you will know the exact latitude and longitude;)',
        endofpage: 'I guess, this will helped you out :)'
    })
})

app.get('/weather', async (req, res) => {
    console.log(req.query)
    if(!req.query.address) {        // instead we can use else to return error
        return res.send ({
            error: 'please provid address key'
        })
    }
    try{
        const response = await geocode(req.query.address);   // we send "address" to called f'n{place name} n get latitude, logitude and location of that place from geocode.js
        if (response) {
            console.log(response, 'hiiiii')
            forecast(response.latitude, response.longitude).then((r)=> {     // here we are passing "lat and long" to get forecast string from forecast.js
                console.log(r, 'rrrrrrrrrr')
                return res.send({                      // this return stmt return the forecast, location n address to the console
                    forecast: r.forecastData,
                    location: response.location,
                    address: req.query.address
                })
            }).catch((err)  => {
                console.log(err, 'errorrrrr')
                res.send(err);
            }) 
        } 
    } catch(err){
        console.log(err, 'errrrr')
        res.send(err);
    }
    // geocode(req.query.address, (error, {latitude, longitude, location}) => {
    //     if (error) {
    //         return res.send(error);   // this is not working
    //     }
    //     forecast(latitude, longitude, (error, forecastData) => {
    //         if (error) {
    //             return res.send(error); 
    //         }

    //         res.send([{                 // dynamic data to using handlebars(hbs)  // index is views name without extension(hbs)
    //             forecast: forecastData,
    //             location,
    //             address: req.query.address
    //         }])
    //     })   
    // })
})

app.get('/help/*', (req, res) => {         // to get error
    res.send('Help article not found!!')
})

app.get('*', (req, res) => {     // to get error message with title and endofpage
    res.render('404', {
        endofpage: 'Page not found!!',
        title: '404'
    })
})

// app.get('', (req, res) => {
//     res.send('<h1>Hello Express!!</h1>');     // html tags in js 
// })

// app.get('/help', (req, res) => {
//     res.send([{                          // an array or objects
//         name: 'Shirisha',
//         age: 24,
//     },
//     {
//         forecast: 'rainy',
//         location: 'India',
//     }
//     ])
// })

// app.get('/about', (req, res) => {      // an string
//     res.send('About page!!');
// })

// app.get('/weather', (req, res) => {      // static data in the web page
//     res.send('weather page!!');
// })

app.listen(port, () => {
    console.log('server is listening to port:'+ port);  // to run in localhost with port number 3000.
})