export class WeatherController {

    constructor($http, AuthService, RiderService) {
      this.$http = $http;
      this.auth = AuthService;
      this.RiderService = RiderService;
      this.locationUrl = "http://ip-api.com/json";
      this.weatherAPIKey = "9e26fddccd5439a15d48ea8a5af57d6e";
      this.weatherURL = "http://api.openweathermap.org/data/2.5/weather";
      this.iconURL = "http://openweathermap.org/img/w/";
      this.message = "Current Weather Conditions For: ";
      this.lat = 33.4488;
      this.lon = -111.8014;

      this.$http.get(this.locationUrl).then (res => {
           this.lat = res.data.lat;
           this.lon = res.data.lon;
           var weatherRequest = this.weatherURL +
                 "?lat=" + this.lat + "&lon=" + this.lon + "&appId=" + this.weatherAPIKey;
           this.$http.get(weatherRequest).then ( res => {
               this.description = res.data.weather[0].description;
               this.speed = (2.237 * res.data.wind.speed).toFixed(1) + " mph";
               this.kspeed = (3.6 * res.data.wind.speed).toFixed(1) + " kph";
               this.name = res.data.name;
               this.temp = res.data.main.temp;
               this.fTemp = (this.temp * (9/5) - 459.67).toFixed(1) + " F";
               this.cTemp = (this.temp - 273).toFixed(1) + " C";
               this.icon = this.iconURL + res.data.weather[0].icon + ".png";
           });
      }).catch(res =>{
        // use hard coded coordinates
        var weatherRequest = this.weatherURL +
        "?lat=" + this.lat + "&lon=" + this.lon + "&appId=" + this.weatherAPIKey;
        this.$http.get(weatherRequest).then ( res => {
           this.description = res.data.weather[0].description;
           this.speed = (2.237 * res.data.wind.speed).toFixed(1) + " mph";
           this.name = res.data.name;
           this.temp = res.data.main.temp;
           this.fTemp = (this.temp * (9/5) - 459.67).toFixed(1) + " F";
           this.cTemp = (this.temp - 273).toFixed(1) + " C";
        });
      });
    }
}