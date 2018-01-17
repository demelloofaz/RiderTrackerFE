export class CreateRideController {
    constructor(RideService, $http) {
      this.service = RideService;
      this.$http = $http;
      this.message = 'hello world - Create Ride Controller';
      this.service.clearCurrentRideId();
    }

    goBackToParentView()
    {
      this.service.goBackToParentView();
    }
  }