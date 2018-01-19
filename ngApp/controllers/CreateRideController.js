export class CreateRideController {
    constructor(RideService, $http, AuthService) {
      this.service = RideService;
      this.$http = $http;
      this.auth = AuthService;
      this.message = '';
      this.service.clearCurrentRideId();
      this.rideName = "";
      this.description= "";
      this.startDate;
      this.distance = 0;
    }

    addRide() {
      // verify the date is OK if so the call the add ride endpoint
      var request = this.service.getCreateRideRequest(this.rideName, this.description, this.startDate, this.distance);
      this.$http.post(this.auth.getBaseRideURL()  + '/CreateRide', request)
      .then(res => {
         this.goBackToParentView();
      })
      .catch(res => {
          this.message = "Unable to create a ride at this time, try again later";
      });
    }

    goBackToParentView()
    {
      this.service.goBackToParentView();
    }
  }