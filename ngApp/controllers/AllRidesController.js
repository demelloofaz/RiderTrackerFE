export class AllRidesController {
    constructor(AuthService, $http, RideService, SignupService, $mdDialog) {
      this.auth = AuthService;
      this.$http = $http;
      this.service = RideService;
      this.SignupService = SignupService;
      this.Dialog = $mdDialog;
      this.rides = [];
      this.signups = [];
      this.myRides = [];
      this.message = '';
      this.myView = "/Rides";
      this.service.clearCurrentRideId();
      this.service.clearBackLink();
      this.selectedTab = this.auth.getLastTab();
      this.auth.clearLastTab();

      // Create rides data
      this.service.clearCurrentRideId();
      this.rideName = "";
      this.description= "";
      this.startDate = new Date();
      this.distance;
      this.dateInput;
      this.timeInput;

      // create the minimum date for the date picker in creste
      var currDate = new Date();
      var strDate = currDate.toString();
      var dd = currDate.getDate();
      var mm = currDate.getMonth()+1; //January is 0!
      var yyyy = currDate.getFullYear();
      if(dd<10) {
        dd = '0'+dd
      } 
      if(mm<10) {
        mm = '0'+mm
      } 

      this.today = mm + '/' + dd + '/' + yyyy;

      // get all of the rides...
      var requestRidesString = this.service.getUpcomingRidesRequest();

      this.$http.get(requestRidesString)
        .then(res => {  
            this.rides = res.data;

            var requestString = this.SignupService.getRidersSignupString();

            this.$http.get(requestString)
            .then(res => {  
              this.signups = res.data;
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

    detailRide(rideId, currTab) {
        this.auth.setLastTab(currTab);
        this.service.saveRideId(rideId);
        this.service.routeToView("/RideDetails", this.myView);
    }
    editRide(rideId, currTab) {
        this.auth.setLastTab(currTab);
        this.service.saveRideId(rideId);
        this.service.routeToView("/EditRide", this.myView);
    }
    deleteRide(rideId, currTab) {
        this.auth.setLastTab(currTab);
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

    // Create Ride
    addRide() {
        // verify the date is OK if so the call the add ride endpoint   
        this.startDate.setMinutes(this.timeInput.getMinutes());
        this.startDate.setHours(this.timeInput.getHours());   
        this.startDate.setSeconds(0);  
        this.startDate.getTimezoneOffset(); 
  
        this.startDate.setDate(this.dateInput.getDate());
        this.startDate.setMonth(this.dateInput.getMonth());
        this.startDate.setFullYear(this.dateInput.getFullYear());
  
        var request = this.service.getCreateRideRequest(this.rideName, this.description, this.startDate, this.distance);
        this.$http.post(this.auth.getBaseRideURL()  + '/CreateRide', request)
        .then(res => {
           //this.clearInputData();
           this.showSuccessDialog();
        })
        .catch(res => {
            this.message = "Unable to create a ride at this time, try again later";
        });
      }

    clearInputData()
    {
        this.rideName = "";
        this.description= "";
        this.distance= null;
        this.dateInput= null;
        this.timeInput= null;
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
    // Dialogs...
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
    showSuccessDialog(){
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        this.Dialog.show(
        this.Dialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Create New Ride')
            .textContent("Ride has been added!")
            .ariaLabel('Ride Added')
            .ok('OK')
        );
    }
  }