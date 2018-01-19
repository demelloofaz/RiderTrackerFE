export class EditRideController {
    constructor(RideService, $http, AuthService) {
      this.message = '';
      this.service = RideService;
      this.auth = AuthService;
      this.$http = $http;
      this.rideId = this.service.getCurrentRideId();
      this.ride = [];

      // create the url string
      var requestString = this.service.getRideRequest(this.rideId);

      // make the http get request
      this.$http.get(requestString)
      .then( (res) => {
          this.ride = res.data;
      })
      .catch( (res) => {
          this.message = "Unable to Get Ride Data at this time.";
      });
    }

    editRide() {
      // create the url string
      
      var request = this.service.getEditRideRequest(
        this.rideId, 
        this.ride.rideName, 
        this.ride.description, 
        this.ride.startDate, 
        this.ride.distance);
        
      var urlString = this.auth.getBaseRideURL()  + '/EditRide';
     
      // make the http get request
      this.$http.post(urlString, request)
      .then( (res) => {
            this.goBackToParentView();
           })
      .catch( (res) => {
            this.message = "Unable to Update Ride Data at this time.";
        });
    }

    goBackToParentView()
    {
      this.service.goBackToParentView();
    }
  }