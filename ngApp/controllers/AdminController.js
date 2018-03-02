export class AdminController {
    constructor(AuthService, $http, RiderService, $mdDialog) {
      this.auth = AuthService;
      this.$http = $http;
      this.service = RiderService;
      this.Dialog = $mdDialog;
      this.riders = [];
      this.message = 'hello world from Admin Rider Controller';
      this.myView = "/Admin";
      this.service.clearCurrentRiderId();
      this.service.clearBackLink();

      // get all of the riders...
      var requestString = this.auth.getBaseRiderURL() + '/GetRiders?RequestingId=' + this.auth.getCurrentId() + '&Authorization=' + this.auth.getToken();
      
      this.$http.get(requestString)
        .then(res => {  
            this.riders = res.data;
            this.message = "Success - Got the riders"
        })
        .catch(res => {
            this.message = "Error in getting riders.";
            this.showErrorDialog();
        });
    }

    showErrorDialog(){
        // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    this.Dialog.show(
      this.Dialog.alert()
        .parent(angular.element(document.querySelector('#popupRiderContainer')))
        .clickOutsideToClose(true)
        .title('Server Error')
        .textContent(this.message)
        .ariaLabel('Server Error')
        .ok('OK')
    );
    }

    detailRider(currentRiderId, currTab) {
        this.auth.setLastTab(currTab);
        this.service.saveRiderId(currentRiderId);
        this.service.routeToView("/RiderDetails", this.myView);
    }
    editRider(currentRiderId, currTab) {
        this.auth.setLastTab(currTab);
        this.service.saveRiderId(currentRiderId)
        this.service.routeToView("/EditRider", this.myView)
    }
    deleteRider(currentRiderId, currTab) {
        this.auth.setLastTab(currTab);
        this.service.saveRiderId(currentRiderId);
        this.service.routeToView("/DeleteRider", this.myView);
    }
    createRider(currTab) {
        this.auth.setLastTab(currTab);
        this.service.routeToView("/CreateRider", this.myView);
    }
  }