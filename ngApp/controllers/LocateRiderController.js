export class LocateRiderController {
    constructor(AuthService, RiderService, FollowService,  $location, $http) {
      this.auth = AuthService;
      this.RiderService = RiderService;
      this.FollowService = FollowService;
      this.$location = $location;
      this.$http = $http;
      this.RiderIdToLocate =  this.FollowService.getCurrentFollowingId();
      this.RiderLocationData;
      this.message = 'Hello From LocateRider - Id: ' + this.RiderIdToLocate;
      this.LatLon = "";
      this.GoogeString="";
      // get the rider location data...
      var request = this.RiderService.getRiderLocationString(this.RiderIdToLocate);

      // make the http get request
      debugger;
      this.$http.get(request)
      .then( (res) => {
          this.RiderLocationData = res.data;
          this.LatLon = this.RiderLocationData.latitude + "," + this.RiderLocationData.longitude;
          this.mapPosition();
        }).
          catch( (res) => {
              this.message = "Unable to Get Loction Data at this time.";
          });
    }
    // google maps mapping interface...
    mapPosition() {
      var myTitle = "Location of " + this.RiderLocationData.fullName;
      var location = new google.maps.LatLng(this.RiderLocationData.latitude, 
        this.RiderLocationData.longitude);
      var mapOptions = {
          zoom : 17,
          center : location,
          mapTypeId : google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById('mapholder'), mapOptions);
      var marker = new google.maps.Marker({
          position: location,
          title: myTitle,
          map: map,
          animation: google.maps.Animation.DROP
      });
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({
          'latLng' : location
          }, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                  if (results[1]) {
                      var options = {
                          content : results[1].formatted_address,
                          position : location
                      };
                      var popup = new google.maps.InfoWindow(options);
                      google.maps.event.addListener(marker, 'click', function() {
                          popup.open(map);
                      });
                  } 
                  else 
                  {
                      alert('No results found');
                  }
              } 
              else 
              {
                  alert('Geocoder failed due to: ' + status);
              }
          });
    }
  }