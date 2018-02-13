export class AdminRidesController {
    constructor(AuthService, $http, RideService, $mdDialog) {
      this.auth = AuthService;
      this.$http = $http;
      this.service = RideService;
      this.Dialog = $mdDialog;
      this.rides = [];
      this.message = 'hello world from Admin Rides Controller';
      this.myView = "/AdminRides";
      this.service.clearCurrentRideId();
      this.service.clearBackLink();

      
      // get all of the rides...
      var requestString = this.auth.getBaseRideURL() + '/GetAllRides?RiderId=' + this.auth.getCurrentId() + '&Authorization=' + this.auth.getToken();
      this.$http.get(requestString)
        .then(res => {  
         
            this.rides = res.data;
            this.message = "Success - Got the rides"
        })
        .catch(res => {
            this.message = "Error in getting rides.";
            this.showErrorDialog();
        });
        
    }
    showErrorDialog(){
        // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    this.Dialog.show(
      this.Dialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Server Error')
        .textContent(this.message)
        .ariaLabel('Server Error')
        .ok('OK')
    );
    }
    detailRide(rideId) {
        this.service.saveRideId(rideId);
        this.service.routeToView("/RideDetails", this.myView);
    }
    editRide(rideId) {
        this.service.saveRideId(rideId);
        this.service.routeToView("/EditRide", this.myView);
    }
    deleteRide(rideId) {
        this.service.saveRideId(rideId);
        this.service.routeToView("/DeleteRide", this.myView);
    }
    createRide() {
        this.service.routeToView("/CreateRide", this.myView);
    }
  }