export class DeleteRiderController {
    constructor(RiderService, $http, AuthService) {
      this.message = 'hello world - Delete Rider Controller';
      this.$http = $http;
      this.service = RiderService;
      this.auth = AuthService;
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
    deleteRider() {
      // create the url string
      var urlString  = this.auth.getBaseRiderURL()  + '/DeleteRider';
      this.$http({
        method: 'DELETE',
        url: urlString,
        data: {
            requestingId : this.auth.getCurrentId(),
            authorization : this.auth.getToken(),
            targetId : this.riderId
        },
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        }})
        .then( (res) => {
            this.goBackToParentView();
           })
        .catch( (res) => {
            this.message = "Unable to Delete Rider Data at this time.";
        });
    }
    goBackToParentView()
    {
      this.service.goBackToParentView();
    }
  }