export class DeleteRiderController {
    constructor(RiderService, $http) {
      this.message = 'hello world - Delete Rider Controller';
      this.$http = $http;
      this.service = RiderService;
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