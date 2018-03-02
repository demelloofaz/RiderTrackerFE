export class RiderService{
    constructor(AuthService)
    {
        this.auth = AuthService;
        this.CURRENT_RIDER_KEY = 'CurrentRider';
    }
    clearCurrentRiderId() {
        localStorage.removeItem(this.CURRENT_RIDER_KEY);
    }
    clearBackLink() {
        localStorage.removeItem(this.BACK_LINK_KEY);
    }
    setCurrentRiderId(riderId){
        localStorage.setItem(this.CURRENT_RIDER_KEY, riderId );
    }
    getCurrentRiderId(){
        return localStorage.getItem(this.CURRENT_RIDER_KEY);
    }
    saveRiderId( rider){
        this.setCurrentRiderId(rider);
    }
    routeToView( newDest, backLink){
        this.auth.setBackLink(backLink);
        this.auth.goToPage(newDest);
    }
    goBackToParentView() {
        var previousView = this.auth.getBackLink();
        this.auth.clearBackLink();
        this.auth.goToPage(previousView);
    }
    getRiderRequest(riderId) {
        var requestString = this.auth.getBaseRiderURL()  + 
        '/GetRider?RequestingId=' + 
        this.auth.getCurrentId() + 
        '&TargetId=' + 
        riderId +
        '&Authorization=' + 
        this.auth.getToken();
        
        return requestString;
    }
    getRiderLocationString(riderId) {
        var requestString = this.auth.getBaseRiderURL()  + 
        '/GetRiderLocation?RequestingId=' + 
        this.auth.getCurrentId() + 
        '&RiderId=' + 
        riderId +
        '&Authorization=' + 
        this.auth.getToken();
        return requestString;
    }
    getRiderLocationUpdateUrl() {
        var requestString = this.auth.getBaseRiderURL()  + 
        '/UpdateRiderLocation';
        return requestString;
    }
    createRiderLocationUpdateRequest(_riderId, _rideId, _longitude, _latitude)
    {
        var targetRide = _rideId;
        if (_rideId == 0)
            targetRide = -1;
            
        var requestData = {
            requestingId : this.auth.getCurrentId(),
            authorization : this.auth.getToken(),
            riderId: _riderId,
            rideId: _rideId,
            longitude: _longitude,
            latitude: _latitude
        }
        return requestData;
    }
    isValidRole (role)
    {
        var result = false;
        if (role == "Admin")
            result = true;
        else if (role == "User")
            result = true;
        return result;
    }

    getAllRidersInfoRequestString(){
        var result = this.auth.getBaseRiderURL();
        result += "/GetRidersInfo?RequestingId=";
        result += this.auth.getCurrentId();
        result += "&Authorization=";
        result += this.auth.getToken();
        return result;
    }

    
}
RiderService.$inject = ['AuthService'];