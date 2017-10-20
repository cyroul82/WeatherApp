const yargs = require('yargs');

const geocode = require('./geocode/geocode');

const argv =  yargs
  .options({
    a: {
      demands: true,
      alias: 'addr',
      description: 'Address to fetch weather for',
      string: true
    }
  })
  .help().alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.addr, (errorMessage, results) => {
  if(errorMessage){
    console.log(errorMessage);
  }
  else {
    //console.log(JSON.stringify(results, undefined, 2));
    geocode.geocodeWeather(results.latitude, results.longitude, (errorMessageWeather, resultsWeather) => {
      if(errorMessageWeather){
        console.log(errorMessageWeather);
      }
      else{
        console.log(results.address);
        console.log(resultsWeather);
      }
    })
  }
});
