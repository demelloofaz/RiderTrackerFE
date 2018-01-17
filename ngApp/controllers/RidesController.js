export class RidesController {
    constructor(AuthService, $http, RideService) {
      this.auth = AuthService;
      this.$http = $http;
      this.service = RideService;
      this.rides = [];
      this.message = 'hello world from Rides Controller';
      this.myView = "/Rides";
      this.service.clearCurrentRideId();
      this.service.clearBackLink();

      // get all of the rides...
      var requestString = this.auth.getBaseRideURL() + '/GetAllRides?RiderId=' + this.auth.getCurrentId() + '&Authorization=' + this.auth.getToken();
      this.$http.get(requestString)
        .then(res => {  
            debugger;
            this.rides = res.data;
            this.message = "Success - Got the rides"
        })
        .catch(res => {
            this.message = "Error in getting rides.";
        });
        
    }
    detailRide(rideId) {
        this.service.saveRideId(rideId);
        this.service.routeToView("/RideDetails", this.myView);
    }
    editRide(rideId) {
        this.service.saveRideId(rideId);
        this.service.routeToView("/EditRide", this.myView);
    }
    deleteRide(rideId) {
        this.service.saveRideId(rideId);
        this.service.routeToView("/DeleteRide", this.myView);
    }
    createRide() {
        this.service.routeToView("/CreateRide", this.myView);
    }
    canModifyRide(rideId) {
        return this.service.canModifyRide(rideId);
    }
    signedUpForRide(rideId, mySignups){
        // loop thru signups and see if the ride id
        // is in the list
    }

  }