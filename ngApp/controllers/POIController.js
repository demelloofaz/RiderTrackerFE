export class POIController {

    constructor($http, AuthService, RiderService) {
      this.$http = $http;
      this.auth = AuthService;
      this.RiderService = RiderService;
      this.message = "Current Weather Conditions For: ";
      this.lat = 33.24298;
      this.lon = -111.80319;
      this.POI = [
              [ "Gateway Airport", "Restrooms and Water located inside", -111.670598, 33.310595],
              [ "Compass Christian Church", "Water Fountain at west enterance", -111.859479, 33.279943],
              [ "Seville Rec Center", "Water Fountain and restrooms located inside", -111.705632, 33.227755],
              [ "Joe's Farm Grill", "Water Fountains And Restooms located at east end", -111.725260, 33.321901],
              [ "Cosmo Dog Park", "Water Fountain and Restrooms", -111.734932, 33.321845],
              [ "Performance Bike Chandler", "Sponsors Saturday Group Rides", -111.944225, 33.318513],
              [ "Global Bikes Gilbert",  "Sponsors Sunday Service Group Ride", -111.787766, 33.365570],
              [ "SCC Home Ride Start", "Normal Starting point for SCC Satureday and Sunday rides", -111.792154, 33.279182],
              [ "Pecos Park And Ride", "Start of SCC Tookeeville ride", -111.998127, 33.292761]
        ];
        this.getMyLocation();
        this.drawMap();
    };

    getMyLocation(){
        // tbd in future...
    }
    drawMap()
    {
        var myLatLng = {lat: this.lat, lng: this.lon};
        var map = new google.maps.Map(document.getElementById('mapholder2'), {
          zoom: 11,
          center: myLatLng
        });


        // Display multiple markers on a map
        var infoWindow = new google.maps.InfoWindow(), marker, i;
        var infoWindowContent = [];
        for ( i = 0; i < this.POI.length; i++)
        {
            var currLoc = {lat: this.POI[i][3], lng: this.POI[i][2]};
            var currTitle = this.POI[i][0];
             marker = new google.maps.Marker({
                position: currLoc,
                map : map,
                title: currTitle,

            });
            // set up the info window content
            var strInfo = '<div class="info_content"><h3>' + this.POI[i][0] + '</h3><p>' + this.POI[i][1] + '</p></div>';
            infoWindowContent.push(strInfo);

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infoWindow.setContent(infoWindowContent[i]);
                    infoWindow.open(map, marker);
                }
            })(marker, i));
        }
    }
}