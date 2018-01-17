export class RideService{
    constructor($http, AuthService, $location)
    {
        this.$http = $http;
        this.auth = AuthService;
        this.$location = $location;
        this.CURRENT_RIDE_KEY = 'CurrentRide';
        this.BACK_LINK_KEY = 'BackLink';
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
    setBackLink(backLink){
        localStorage.setItem(this.BACK_LINK_KEY, backLink );
    }
    getCurrentRideId(){
        return localStorage.getItem(this.CURRENT_RIDE_KEY);
    }
    getBackLink(){
        return localStorage.getItem(this.BACK_LINK_KEY);
    }
    saveRideId( ride){
        this.setCurrentRideId(ride);
    }
    routeToView( newDest, backLink){
        this.setBackLink(backLink);
        this.$location.path([newDest]);
    }
    goBackToParentView() {
        var previousView = this.getBackLink();
        this.clearBackLink();
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
    canModifyRide(riderId) {
        var currentRiderId = this.auth.getCurrentId();
        if (currentRiderId == riderId)
            return true;
        return false;
    }

}
RideService.$inject = ['$http', 'AuthService', '$location'];