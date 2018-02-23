export class MyRidesController {
    constructor(AuthService, $http, RideService, SignupService, $mdDialog) {
      this.auth = AuthService;
      this.$http = $http;
      this.service = RideService;
      this.SignupService = SignupService;
      this.Dialog = $mdDialog;
      this.rides = [];
      this.signups = [];
      this.myRides = [];
      this.message = 'hello world from MyRides Controller';
      this.myView = "/MyRides";
      this.service.clearCurrentRideId();
      this.service.clearBackLink();

      // get all of the rides...
      var currDate = new Date();
      var strDate = currDate.toString();
      var requestRidesString = this.service.getUpcomingRidesRequest();
      
      this.$http.get(requestRidesString)
        .then(res => {  
            this.rides = res.data;
            this.message = "Success - Got the rides"
            var requestString = this.SignupService.getRidersSignupString();
      
            this.$http.get(requestString)
            .then(res => {  
              this.signups = res.data;
              this.message = "Success - Got the rider signups"
              this.createMyRidesList();
            })
            .catch(res => {
              this.message = "Error in getting rider signups.";
              this.showErrorDialog();
            });
        })
        .catch(res => {
            this.message = "Error in getting rides.";
            this.showErrorDialog();
        });
    }
    getAllRiderSignups(){
      var requestString = this.SignupService.getRidersSignupString();
      
      this.$http.get(requestString)
        .then(res => {  
            this.signups = res.data;
            this.message = "Success - Got the rider signups"
            this.createMyRidesList();
        })
        .catch(res => {
            this.message = "Error in getting rider signups.";
            this.showErrorDialog();
        });
    }
    createMyRidesList(){
      for (var i = 0; i < this.rides.length; i++) {
        var currentId = this.rides[i].id;
        if (this.isSignedUp(currentId))
          this.myRides.push(this.rides[i]);
      }
    }

    isSignedUp(rideID)
    {
      for (var i = 0; i < this.signups.length; i++){
        if (this.signups[i].rideID == rideID){
          return true;
        }
      }
      return false;
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

    canModifyRide(rideId) {
        return this.service.canModifyRide(rideId);
    }

    isInAdminMode(){
        if (this.RideService.isAdminBackLink())
        return true;
      }
    isInRideMode(){
        if (this.RideService.isRideBackLink())
        return true;
    }
    isInMyRideMode(){
      if (this.RideService.isMyRideBackLink())
      return true;
    }

    signOutRide(_rideId){
      var urlString  = this.auth.getBaseSignupURL()  + '/DeleteSignup';
      this.$http({
        method: 'DELETE',
        url: urlString,
        data: {
            requestingId : this.auth.getCurrentId(),
            authorization : this.auth.getToken(),
            riderId : this.auth.getCurrentId(),
            rideId : _rideId
        },
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        }})
        .then( (res) => {
            this.message = "Deleted signup";
            this.updateMyRidesList(_rideId);
          })
        .catch( (res) => {
            this.message = "Unable to Delete Signup Data at this time.";
        });

    }
    updateMyRidesList(rideId) {
      // remove signup from the list
      
      // update the signup list.
      for (var i = 0; i < this.signups.length; i++){
        if (this.signups[i].rideID == rideId){
            this.signups.splice(i,1);
            break
          }
      }

      // update the myrides list
      for (var j = 0; j < this.myRides.length; j++){
        if (this.myRides[j].id == rideId){
            this.myRides.splice(j,1);
            break
          }
      }

    }
    showErrorDialog(){
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        this.Dialog.show(
        this.Dialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Server Error Detected')
            .textContent(this.message)
            .ariaLabel('Server Error Detected')
            .ok('OK')
        );
    }
  }