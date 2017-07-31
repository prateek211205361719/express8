
var express = require('express');
var  weatherApi = require('./weather-api/geolocation');
var hbs = require('hbs');

var app = express();
app.use(express.static(__dirname + '/resource'));

app.set('view engine', hbs);

var port = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.render('home.hbs');
});


app.get('/weather', (req, res) => {
     var address = '';
     weatherApi.getGeoLocation(req.query.location).then(function(result){
            console.log(JSON.stringify(result, undefined, 2));
            address = result.addrss;
           return weatherApi.getTemperature(result.long, result.lat);

     }).then(function(result1){
        res.render('weather.hbs',{
            location:address,
            temp:result1
        });
     }).catch(function(error){
        console.log('-----'+error);
     });

});
/*app.get('/weather', (req, res) => {
   weatherApi.getGeoLocation(req.query.location, function(error, result){
         if(error){
             console.log('-----122------'+error);
         }else{
             //b2715dc7789a4037ecee7c3e1605b5ff
             console.log(JSON.stringify(result, undefined, 2));
             weatherApi.getTemperature(result.long, result.lat, function(error, res1){
                res.render('weather.hbs', {
                    location:result.addrss,
                    temp:res1
                });
             });
         }
   });
 
});*/



app.listen(port, () => {
    console.log('-------running-----'+port);
});