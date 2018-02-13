export class RideService{
    constructor(AuthService, $location)
    {
        this.auth = AuthService;
        this.$location = $location;
        this.CURRENT_RIDE_KEY = 'CurrentRide';
    }
    clearCurrentRideId() {
        localStorage.removeItem(this.CURRENT_RIDE_KEY);
    }
    clearBackLink() {
        localStorage.removeItem(this.BACK_LINK_KEY);
    }
    setCurrentRideId(ride){
        localStorage.setItem(this.CURRENT_RIDE_KEY, ride );
    }
    getCurrentRideId(){
        return localStorage.getItem(this.CURRENT_RIDE_KEY);
    }
    saveRideId( ride){
        this.setCurrentRideId(ride);
    }
    isAdminBackLink() {
        if (this.auth.getBackLink() == "/AdminRides")
           return true;
        else
           return false;
    }
    isRideBackLink() {
        if (this.auth.getBackLink() == "/Rides")
           return true;
        else
           return false;
    }
    isMyRideBackLink() {
        if (this.auth.getBackLink() == "/MyRides")
           return true;
        else
           return false;
    }
    routeToView( newDest, backLink){
        this.auth.setBackLink(backLink);
        this.$location.path([newDest]);
    }
    goBackToParentView() {
        var previousView = this.auth.getBackLink();
        this.auth.clearBackLink();
        this.$location.path([previousView]);

    }
    getRideRequest(rideId) {
        var requestString = this.auth.getBaseRideURL()  + 
        '/GetRide?RiderId=' + 
        this.auth.getCurrentId() + 
        '&RideId=' + 
        rideId +
        '&Authorization=' + 
        this.auth.getToken();
        
        return requestString;
    }
    getCreateRideRequest(_rideName, _description, _startDate, _distance) {
        var requestData = {
            riderId : this.auth.getCurrentId(),
            authorization: this.auth.getToken(),
            rideName :_rideName,
            description : _description,
            rideStart : _startDate,
            distance : _distance
        }
        return requestData;
    }
    getEditRideRequest (_rideId, _rideName, _description, _startDate, _distance) {

        var requestData = {
            riderId : this.auth.getCurrentId(),
            authorization: this.auth.getToken(),
            rideId : _rideId,
            rideName :_rideName,
            description : _description,
            rideStart : _startDate,
            distance : _distance
        }
        return requestData;
    }
    canModifyRide(riderId) {
        var currentRiderId = this.auth.getCurrentId();
        if (currentRiderId == riderId)
            return true;
        return false;
    }
}
RideService.$inject = ['AuthService', '$location'];