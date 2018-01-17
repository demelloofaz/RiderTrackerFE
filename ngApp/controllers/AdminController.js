export class AdminController {
    constructor(AuthService, $http, RiderService) {
      this.auth = AuthService;
      this.$http = $http;
      this.service = RiderService;
      this.riders = [];
      this.message = 'hello world from Admin Rider Controller';
      this.myView = "/Admin";
      this.service.clearCurrentRiderId();
      this.service.clearBackLink();

      // get all of the riders...
      var requestString = this.auth.getBaseRiderURL() + '/GetRiders?RequestingId=' + this.auth.getCurrentId() + '&Authorization=' + this.auth.getToken();
      debugger;
      this.$http.get(requestString)
        .then(res => {  
            debugger;
            this.riders = res.data;
            this.message = "Success - Got the riders"
        })
        .catch(res => {
            this.message = "Error in getting riders.";
        });
    }
    detailRider(currentRiderId) {
        debugger;
        this.service.saveRiderId(currentRiderId);
        this.service.routeToView("/RiderDetails", this.myView);
    }
    editRider(currentRiderId) {
        this.service.saveRiderId(currentRiderId)
        this.service.routeToView("/EditRider", this.myView)
    }
    deleteRider(currentRiderId) {
        this.service.saveRiderId(currentRiderId);
        this.service.routeToView("/DeleteRider", this.myView);
    }
    createRider() {
        this.service.routeToView("/CreateRider", this.myView);
    }
  }