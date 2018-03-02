export class RideDetailsController {
    constructor(RideService, SignupService, $http, AuthService) {
      this.message = 'hello world from Ride Details Controller';
      this.RideService = RideService;
      this.auth = AuthService;
      this.$http = $http;
      this.SignupService = SignupService;

      this.rideId = this.RideService.getCurrentRideId();
      this.ride = [];
      this.signupId = -1;
      this.signup= [];
      this.buttonText ="Join the Ride";
      this.attendees = [];

      // create the url string
      var requestString = this.RideService.getRideRequest(this.rideId);

      // make the http get request
      this.$http.get(requestString)
        .then( (res) => {
            this.ride = res.data;
            // if we are running under the Ride mode we see if there is a signup for this ride.
            if (this.isInRideMode() || this.isInMyRideMode()) {
              var requestSignupString = this.SignupService.getSignupString(this.rideId);
              this.$http.get(requestSignupString)
                .then( (res) => {
                  this.signup = res.data;
                  this.signupId = this.signup.signupID;
                  this.buttonText = "Leave the Ride";
                  //this.getAttendeeList(this.rideId);

                  var requestString = this.SignupService.getRideAttendeeString(this.rideId);
                  // make the http get request
                  this.$http.get(requestString)
                    .then( (res) => {
                        this.attendees = res.data;
                    }).
                    catch( (res) => {
                        this.message = "Unable to Get Ride Attendee Data at this time.";
                    });
                })
                .catch( res => {
                  if (res.status != 404)
                      this.message = "Unable to Get Ride Data at this time.";
                });
            }
        }).
        catch( (res) => {
            this.message = "Unable to Get Ride Data at this time.";
        });
    }

    isInRideMode(){
      if (this.RideService.isRideBackLink())
      return true;
    }
    isInMyRideMode(){
      if (this.RideService.isMyRideBackLink())
      return true;
    }


    toggleSignUp(){

      if (!this.isInRideMode())
        return;

      if (this.buttonText == "Join the Ride"){
        var request = this.SignupService.getCreateSignupRequest(this.rideId);
        var urlString =this.auth.getBaseSignupURL()  + '/CreateSignup';
        this.$http.post(urlString, request)
        .then(res => {
          this.signup = res.data;
          this.signupId = this.signup.signupID;
          this.buttonText = "Leave the Ride";
          this.getAttendeeList(this.rideId);
        })
        .catch(res => {
            this.message = "Unable to create a ride at this time, try again later";
        });
      }
      else {
        // create the delete request to leave the ride...

        // create the url string
        var urlString  = this.auth.getBaseSignupURL()  + '/DeleteSignupById';
        this.$http({
          method: 'DELETE',
          url: urlString,
          data: {
              requestingId : this.auth.getCurrentId(),
              authorization : this.auth.getToken(),
              signupId: this.signupId
          },
          headers: {
              'Content-type': 'application/json;charset=utf-8'
          }})
          .then( (res) => {
              this.buttonText = "Join the Ride";
              this.signupId = -1;
              this.getAttendeeList(this.rideId);
            })
          .catch( (res) => {
              this.message = "Unable to Delete Signup Data at this time.";
          });
      }
    }

    goBackToParentView()
    {
      this.RideService.goBackToParentView();
    }

    getAttendeeList(rideId){
      // tbd figure out how to do a query that will return a list of all the rider 
      // full names that are signed up for the ride.
      var requestString = this.SignupService.getRideAttendeeString(this.rideId);

      // make the http get request
      this.$http.get(requestString)
        .then( (res) => {
            this.attendees = res.data;
        }).
        catch( (res) => {
            this.message = "Unable to Get Ride Attendee Data at this time.";
        });
    }
  }