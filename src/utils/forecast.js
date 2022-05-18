const request = require('request');

const forecast = (Latitude, Longitude) => {
    const url = 'http://api.weatherstack.com/current?access_key=b3f238c5aeda8e4c7d72472db0ff4ec0&query=' +Latitude+ ',' +Longitude+ '&units=f';

    return new Promise((resolve, reject) => {
    request({ url, json: true }, (error, {body}) => {
        // console.log(response.body);
        if (error) {
            reject({
                err: 'Unable to connect to weather service',
            });
        } else if (body.error) {
            reject({
                err: 'unable to find location!!',
            });
        } else {
            console.log(body.location, 'location string')
            const {lat, lon, country} = body.location;
            resolve({
                forecastData: 'It is latitude: ' +lat+' It is longitude: ' +lon+ ' It is country: ' +country,
            });
        }
        });
    })
}

module.exports = forecast;
 