export class EditRiderController {
    constructor(RiderService, $http, AuthService, $location) {
      this.message = '';
      this.service = RiderService;
      this.$http = $http;
      this.$location= $location;
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
    editRider() {
          
      if (this.service.isValidRole(this.rider.role)) {
        var requestData  = this.auth.createRiderUpdateRequest(this.rider);
        this.message = "";
        this.$http.post(this.auth.getBaseRiderURL()  + '/EditRider', requestData)
        .then(res => {
            //redirect
            this.service.goBackToParentView();
        }).catch(res => {
            this.message = "Unable to update profile at this time, try again later";
        });
      }
      else
        this.message = "Invalid Role detected."
    }
    goBackToParentView()
    {
      this.service.goBackToParentView();
    }
  }