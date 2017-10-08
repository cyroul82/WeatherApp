const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedURI = encodeURIComponent(address);

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURI}`,
  json: true
}, (error, response, body) => {
  //var j =JSON.stringify(body, undefined, 2);
  if(error){
    callback('Unable to connect to google servers.');
  }
  else if (body.status === 'ZERO_RESULTS'){
    callback('Unable to find that address.');
  }
  else if(body.status === 'OK'){
    callback(undefined, {
      address: body.results[0].formatted_address,
      latitude: body.results[0].geometry.location.lat,
      longitude: body.results[0].geometry.location.lng
    })
    // console.log(`Address : ${body.results[0].formatted_address}`);
    // console.log(`Latitude : ${body.results[0].geometry.location.lat}`);
    // console.log(`Longitude : ${body.results[0].geometry.location.lng}`);
  }
});
};


var geocodeWeather = (latitude, longitude, callback) => {

request({
  url: `https://api.darksky.net/forecast/xxxxxxxxxxxxxxxxxxxxxx/${latitude},${longitude}?lang=fr&units=auto`,
  json: true
}, (error, response, body) => {
  //var j =JSON.stringify(body, undefined, 2);
  if(error){
    callback('Unable to connect to weather api.');
  }
  else if (body.code === 400){
    callback('Unable to find the weather for that address.');
  }
  else {
    callback(undefined, {
      temperature: body.currently.temperature,
      apparentTemperature: body.currently.apparentTemperature,
      summary: body.currently.summary,
      windSpeed: body.currently.windSpeed
    })
  }
});
};

module.exports = {
  geocodeAddress,
  geocodeWeather
};
