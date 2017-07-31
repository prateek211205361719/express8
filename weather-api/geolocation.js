


var request = require('request');

var getGeoLocation = function(location){
     return new Promise(function(resolve, reject){
        location = encodeURIComponent(location);
        request.get({
                url:'https://maps.googleapis.com/maps/api/geocode/json?address=c'+location,
                json:true
            },function(error, response, body){
            if(error){
                 reject('Unable to connect');
            }else if(body.status === "ZERO_RESULTS"){
                 reject('Unable to find address');
            }else if(body.status === 'OK'){
                resolve({
                    addrss: body.results[0].formatted_address,
                    long: body.results[0].geometry.location.lng,
                    lat: body.results[0].geometry.location.lat,
                });
            }
        });

     });    
};


var getTemperature = function(long, lat){
    return new Promise(function(resolve, reject){
        var location = long+','+lat;
        request.get({
            url: 'https://api.darksky.net/forecast/b2715dc7789a4037ecee7c3e1605b5ff/'+location,
           json:true
        }, function(error, response, body){
            if(!error && response.statusCode === 200)
            resolve(body.currently.temperature);
            if(error){
                reject('Unable to connect');
            }
        });
    });

    
}
   

module.exports = {
    getGeoLocation,
    getTemperature,
};
