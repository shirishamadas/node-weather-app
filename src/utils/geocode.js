const request = require('request');

const geocode = (address) => { // take address from calling function, (this is called f'n)
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2hpcmlzaGFtYWRhcyIsImEiOiJja3l2dG54cjkwMjFwMm5xaXZzMjR2cHRxIn0.QZGJ2cLQl63CK0AVSH_u-A&limit=1';
    return new Promise((resolve, reject) => {
        request({ url, json: true }, (error, {body}) => {
            // console.log(response.body);
            if (error) {
                reject({
                    err: 'Unable to connect to weather service'
                });
            } else if (body.features.length === 0) {
                reject({
                    err: 'unable to find location!!'
                });
            } else {
                resolve({                     // we get lat, lon n location from the response(url)
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                });
            }
        })
    });
   
}

module.exports = geocode;