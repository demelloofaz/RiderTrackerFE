export class CreateRiderController {
    constructor(RiderService, $http) {
      this.message = 'hello world - Create Rider Controller';
      this.service = RiderService;
      this.$http = $http;
      this.service.clearCurrentRiderId();

    }
    goBackToParentView()
    {
      this.service.goBackToParentView();
    }
  }