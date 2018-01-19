export class DeleteRideController {
    constructor(RideService, $http, AuthService) {
      this.message = 'hello world - Delete Ride Controller';
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

    deleteRide() {
      // create the url string
      var urlString  = this.auth.getBaseRideURL()  + '/DeleteRide';
      this.$http({
        method: 'DELETE',
        url: urlString,
        data: {
            riderId : this.auth.getCurrentId(),
            authorization : this.auth.getToken(),
            rideId : this.rideId
        },
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        }})
        .then( (res) => {
            this.goBackToParentView();
           })
        .catch( (res) => {
            this.message = "Unable to Delete Ride Data at this time.";
        });
    }

    goBackToParentView()
    {
      this.service.goBackToParentView();
    }
  }