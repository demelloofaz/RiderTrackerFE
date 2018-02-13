export class HomeLoggedInController {
    constructor(AuthService, FollowService, RideService, SignupService, RiderService, $http, $mdDialog) {
      this.position = null;
      this.watchid = null;
      this.coordinates = '';
      this.auth = AuthService;
      this.FollowService = FollowService;
      this.RideService = RideService;
      this.SignupService = SignupService;
      this.RiderService = RiderService;
      this.$http = $http;
      this.Dialog = $mdDialog;
      this.myView ="HomeLoggedIn";
      this.auth.clearTracking();
      this.trackingEnabled = false;
      this.ButtonText= "Start Tracking";
      this.message = "Current time is: ";
      this.lastTimeStamp = 0;
      this.LastLon = "TBD";
      this.LastLat = "TBD";
      this.updateSkipCnt = 0;
      //this.getLocation();
      var that = this;
      //setInterval( () => this.myTimerFunc(), 20000);

      // alot of data to get on startup...
      this.TodaysRides= [];
      this.MySignups=[];
      this.MyRides=[];
      this.AllRiders = [];
      this.MyRideCompanions = [];
      this.ActiveRide = 0;
      debugger;

      this.showMyLocation();
      // get all of the rides for Today.
      var requestRidesString = this.auth.getBaseRideURL() + '/GetTodaysRides?RiderId=' + this.auth.getCurrentId() + '&Authorization=' + this.auth.getToken();
      
      this.$http.get(requestRidesString)
        .then(res => {  
            this.TodaysRides = res.data;

            // get signups for a rider...
            var requestRidersSignups = this.SignupService. getRidersSignupString();
            this.$http.get(requestRidersSignups)
            .then(res => {  
                this.MySignups = res.data;
                this.getMyRides();
                if (this.MyRides.length == 1)
                  this.ActiveRide = this.MyRides[0].id;
                  
                var requestString = this.SignupService.getRideAttendeeString(this.ActiveRide);
                // make the http get request
                this.$http.get(requestString)
                    .then( (res) => {
                        this.AllRiders = res.data;
                        this.getRideCompanions();
                    }).
                    catch( (res) => {
                        this.message = "Unable to Get Ride Attendee Data at this time.";
                        this.showErrorDialog();
                    });
            })
            .catch(res => {
                this.message = "Error in getting signups.";
                this.showErrorDialog();
            });
        })
        .catch(res => {
            this.message = "Error in getting rides.";
            this.showErrorDialog();
        });
        
    }

    showErrorDialog(){
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        this.Dialog.show(
        this.Dialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Server Error')
            .textContent(this.message)
            .ariaLabel('Server Error')
            .ok('OK')
        );
    }

    showRideAlert() 
    {
      // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application
      // to prevent interaction outside of dialog
      this.Dialog.show(
        this.Dialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Too many rides found for today')
          .textContent('You must have only joined 1 ride for today in order for tracking to be enabled. Please choose a single ride for today.')
          .ariaLabel('Too many rides detected')
          .ok('OK')
      );
    }

    showMyLocation() {
        this.getLocation();
        var d = new Date();
        var pDoc = document.getElementById("demo");
        if (pDoc == null){
          return;
        }
        pDoc.innerHTML = this.message + d.toLocaleTimeString();
    }

    getMyRides() {
      this.MyRides = [];
      for (var i = 0; i < this.MySignups.length; i++) {
        var currentRideId = this.MySignups[i].rideID;
        for (var j = 0; j < this.TodaysRides.length; j++) {
          if (this.TodaysRides[j].id == currentRideId){
            this.MyRides.push(this.TodaysRides[j]);
          }
        }
      }
    }
    getRideCompanions() {
      this.MyRideCompanions= [];
      var myId = this.auth.getCurrentId();
      for (var i = 0; i < this.AllRiders.length; i++){
        // remove me from the list of riders
        var currentRider = this.AllRiders[i];
        if (currentRider.riderId != myId)
          this.MyRideCompanions.push(currentRider);
      }
    }

    toggleTrackingButton() {
      if (this.trackingEnabled) {
        // stop tracking
        this.trackingEnabled = false;
        this.auth.clearTracking();
        this.ActiveRide = -1;
        this.ButtonText = "Start Tracking";
        this.stopWatch()
      }
      else {
        this.determineActiveRide();
        // determine if we can start tracking 
        // must either be signed up for 1 ride or signed up for no rides.
        if (this.ActiveRide == 0)
        {
          // need to pop up a dialog here to tell user to sign up for only 1 ride...
          this.showRideAlert();
        }
        else {
          this.trackingEnabled = true;
          this.auth.setTracking();
          this.ButtonText = "Stop Tracking";
          this.watchLocation();
        }
      }

    }
    
    getLocation()
    {
        // Check whether browser supports Geolocation API or not
        if (navigator.geolocation)  // Supported
        {
            var positionOptions = {
                timeout : 5000,
                maximumAge : 0,
                enableHighAccuracy : true,
            };
            // Obtain the initial location one-off
            navigator.geolocation.getCurrentPosition(this.getPosition, this.catchError, positionOptions);
            this.savePosition();
        }
        else  // Not supported
        {
            alert("Oop! This browser does not support HTML5 Geolocation.");
        }
    }    
    
    watchLocation()
    {
        // Check whether browser supports Geolocation API or not
        if (navigator.geolocation)  // Supported
        {
            var positionOptions = {
                timeout : 5000,
                maximumAge : 0,
                enableHighAccuracy : true,
            };
            // Obtain the location at regularly interval
            this.watchid = navigator.geolocation.watchPosition( this.getPosition, this.catchError, positionOptions);
            this.savePosition();
        }
        else  // Not supported
        {
            alert("Oop! This browser does not support HTML5 Geolocation.");
        }
    }

    stopWatch() 
    {
        // Discontinue obtaining location
        navigator.geolocation.clearWatch(this.watchid);
    }
    
    savePosition() {
        var currTS = Math.round(+new Date() / 1000);
        if (currTS - this.lastTimeStamp > 15) {
            var pLon = document.getElementById('currLon');
            if (pLon != null) {
                var pLonText = pLon.textContent;
                var pLat = document.getElementById('currLat');
                var pLatText = pLat.textContent;
                var riderId = this.auth.getCurrentId();
                
                var urlString = this.RiderService.getRiderLocationUpdateUrl();
                var requestData = this.RiderService.createRiderLocationUpdateRequest(
                    riderId,
                    this.ActiveRide,
                    pLonText,
                    pLatText);

                this.$http.post(urlString, requestData).then( 
                    (res) => { 
                        this.lastTimeStamp = currTS;
                    }
                )
            }
        }
    }

    getPosition(position)
    {
        var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        var pDoc = document.getElementById("currLat");
        // be sure page is in view to update the lon/lat
        if (pDoc != null) {
            document.getElementById("currLat").innerHTML = latitude;
            document.getElementById("currLon").innerHTML = longitude;
            //console.log("Saving location to Dom as: " + latitude +"/"+ longitude);
        }

        var mapOptions = {
            zoom : 16,
            center : location,
            mapTypeId : google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById('mapholder'), mapOptions);
        var marker = new google.maps.Marker({
            position: location,
            title: 'You are here!',
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
    catchError(error) {
      switch(error.code) 
      {
          case error.TIMEOUT:
              alert("The request to get user location has aborted as it has taken too long.");
              break;
          case error.POSITION_UNAVAILABLE:
              alert("Location information is not available.");
              break;
          case error.PERMISSION_DENIED:
              alert("Permission to share location information has been denied!");
              break;    
          default:
              alert("An unknown error occurred.");
      }
    }

    determineActiveRide(){
      debugger;
      var numRidesFound = this.MyRides.length;
      var activeRide; 
      if (numRidesFound == 1)
        activeRide = this.MyRides[0].id;
      else if (numRidesFound == 0)
        activeRide = -1;
      else
        activeRide = 0;
      this.ActiveRide = activeRide;
    }

    locateRider(riderId){
      this.FollowService.setCurrentFollowingId(riderId);
      this.FollowService.routeToView("/LocateRider", this.myView);
    }
  }