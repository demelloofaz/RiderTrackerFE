export class SignupService{
    constructor(AuthService, $location)
    {
        this.auth = AuthService;
        this.$location = $location;
    }

    getSignupString(rideId) {
        var requestString = this.auth.getBaseSignupURL()  + 
        '/GetSignup?RequestingId=' + 
            this.auth.getCurrentId() + 
        '&RiderId=' + 
            this.auth.getCurrentId() + 
        '&RideId=' + 
            rideId +
        '&Authorization=' + 
        this.auth.getToken();
        
        return requestString;
    }
    getRidersSignupString() {
        var requestString = this.auth.getBaseSignupURL()  + 
        '/GetRiderSignups?RequestingId=' + 
            this.auth.getCurrentId() + 
        '&RiderId=' + 
            this.auth.getCurrentId() + 
        '&Authorization=' + 
        this.auth.getToken();
        
        return requestString;
    }
    getRideAttendeeString(rideId) {
        var requestString = this.auth.getBaseSignupURL()  + 
        '/GetRideAttendees?RequestingId=' + 
            this.auth.getCurrentId() + 
        '&RideId=' + 
            rideId +
        '&Authorization=' + 
        this.auth.getToken();
        
        return requestString;
    }

    getCreateSignupRequest(_rideId) {
        debugger;
        var requestData = {
            requestingId: this.auth.getCurrentId(),
            riderId : this.auth.getCurrentId(),
            authorization: this.auth.getToken(),
            rideId : _rideId
        }
        return requestData;
    }

    goToView(newDest){
        this.$location.path([newDest]);
    }
}
SignupService.$inject = ['AuthService', '$location'];