export class EditRideController {
    constructor(RideService, $http) {
      this.message = 'hello world - Edit Ride Controller';
      this.service = RideService;
      this.$http = $http;
      this.rideId = this.service.getCurrentRideId();
      this.ride = [];

      // create the url string
      var requestString = this.service.getRideRequest(this.rideId);

      // make the http get request
      this.$http.get(requestString)
        .then( (res) => {
            this.ride = res.data;
        }).
        catch( (res) => {
            this.message = "Unable to Get Ride Data at this time.";
        });
    }
    goBackToParentView()
    {
      this.service.goBackToParentView();
    }
  }