export class RiderService{
    constructor(AuthService, $location)
    {
        this.auth = AuthService;
        this.$location = $location;
        this.CURRENT_RIDER_KEY = 'CurrentRider';
        this.BACK_LINK_KEY = 'BackLink';
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
    setBackLink(backLink){
        localStorage.setItem(this.BACK_LINK_KEY, backLink );
    }
    getCurrentRiderId(){
        return localStorage.getItem(this.CURRENT_RIDER_KEY);
    }
    getBackLink(){
        return localStorage.getItem(this.BACK_LINK_KEY);
    }
    saveRiderId( rider){
        this.setCurrentRiderId(rider);
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
    
    isValidRole (role)
    {
        var result = false;
        if (role == "Admin")
            result = true;
        else if (role == "User")
            result = true;
        return result;
    }
}
RiderService.$inject = ['AuthService', '$location'];