export class RiderDetailsController {
    constructor(RiderService, $http, AuthService) {
      this.message = 'hello world from Rider Details Controller';
      this.service = RiderService;
      this.auth = AuthService;
      this.$http = $http;
      this.riderId = this.service.getCurrentRiderId();
      this.rider = [];

      // create the url string
      var requestString = this.service.getRiderRequest(this.riderId);
  
      // make the http get request
      this.$http.get(requestString)
        .then( (res) => {
            this.rider = res.data;
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